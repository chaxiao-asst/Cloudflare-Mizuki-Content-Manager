import { GitHubClient } from '../github';
import { createCrudRouter } from './crud';

export function createTimelineRouter(githubClient: GitHubClient) {
  return createCrudRouter(githubClient, {
    filePath: 'src/data/timeline.ts',
    varName: 'timelineData',
    typeName: 'TimelineItem[]',
    idExtractor: (item) => (item as { id: string }).id,
  });
}