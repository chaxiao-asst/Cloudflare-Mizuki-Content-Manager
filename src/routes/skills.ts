import { GitHubClient } from '../github';
import { createCrudRouter } from './crud';

export function createSkillsRouter(githubClient: GitHubClient) {
  return createCrudRouter(githubClient, {
    filePath: 'src/data/skills.ts',
    varName: 'skillsData',
    typeName: 'Skill[]',
    idExtractor: (item) => (item as { id: string }).id,
  });
}