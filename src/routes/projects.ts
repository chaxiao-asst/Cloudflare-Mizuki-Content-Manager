import { GitHubClient } from '../github';
import { createCrudRouter } from './crud';

export function createProjectsRouter(githubClient: GitHubClient) {
  return createCrudRouter(githubClient, {
    filePath: 'src/data/projects.ts',
    varName: 'projectsData',
    typeName: 'Project[]',
    idExtractor: (item) => (item as { id: string }).id,
  });
}