function utf8ToBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}

function base64ToUtf8(str: string): string {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
}

export interface GitHubFile {
  content: string;
  sha: string;
}

export interface GitHubResponse {
  content: string;
  sha: string;
  message?: string;
}

export class GitHubClient {
  private config: GitHubConfig;
  private baseUrl: string;
  private pathMapper: (path: string) => string;

  constructor(config: GitHubConfig, pathMapper?: (path: string) => string) {
    this.config = config;
    this.baseUrl = `https://api.github.com/repos/${config.owner}/${config.repo}`;
    this.pathMapper = pathMapper || ((p: string) => p);
  }

  private encPath(path: string): string {
    return this.pathMapper(path).split('/').map(encodeURIComponent).join('/');
  }

  private async request(
    method: string,
    path: string,
    body?: Record<string, unknown>
  ): Promise<GitHubResponse> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      Authorization: `token ${this.config.token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "User-Agent": "Mizuki-Content-Manager-Worker",
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GitHub API error: ${response.status} - URL: ${url} - ${error}`);
    }

    if (response.status === 204) {
      return { content: "", sha: "" };
    }

    return response.json();
  }

  async getFile(path: string): Promise<GitHubFile> {
    const response = await this.request("GET", `/contents/${this.encPath(path)}`);
    return {
      content: response.content ? base64ToUtf8(response.content) : "",
      sha: response.sha,
    };
  }

  async createFile(
    path: string,
    content: string,
    message: string
  ): Promise<GitHubResponse> {
    return this.request("PUT", `/contents/${this.encPath(path)}`, {
      message,
      content: utf8ToBase64(content),
    });
  }

  async updateFile(
    path: string,
    content: string,
    message: string,
    sha: string
  ): Promise<GitHubResponse> {
    return this.request("PUT", `/contents/${this.encPath(path)}`, {
      message,
      content: utf8ToBase64(content),
      sha,
    });
  }

  async deleteFile(path: string, message: string, sha: string): Promise<void> {
    await this.request("DELETE", `/contents/${this.encPath(path)}`, { message, sha });
  }

  async listFiles(path: string): Promise<Array<{ name: string; path: string; type: string }>> {
    const response = await this.request("GET", `/contents/${this.encPath(path)}`);
    const files = response as unknown as Array<{ name: string; path: string; type: string }>;
    files.forEach(file => {
      file.name = decodeURIComponent(file.name);
      file.path = decodeURIComponent(file.path);
    });
    return files;
  }
}