import { GitHubClient } from '../github';
import { createCrudRouter } from './crud';

export function createFriendsRouter(githubClient: GitHubClient) {
  return createCrudRouter(githubClient, {
    filePath: 'src/data/friends.ts',
    varName: 'friendsData',
    typeName: 'FriendItem[]',
    idExtractor: (item) => (item as { id: number }).id,
  });
}