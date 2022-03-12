import { PlaylistItem } from '../model/playlist-item';

export function orderedPlaylistItems(a: PlaylistItem, b: PlaylistItem): number {
  let aDate = Date.parse(a.snippet?.publishedAt || '0');
  let bDate = Date.parse(b.snippet?.publishedAt || '0');
  return bDate - aDate;
}
