import { GitHubClient } from '../github';
import { createCrudRouter } from './crud';

export function createDiaryRouter(githubClient: GitHubClient) {
  return createCrudRouter(githubClient, {
    filePath: 'src/data/diary.ts',
    varName: 'diaryData',
    typeName: 'DiaryItem[]',
    idExtractor: (item) => (item as { id: number }).id,
    onCreate: (item) => ({ ...item, date: new Date().toISOString() }),
  });
}