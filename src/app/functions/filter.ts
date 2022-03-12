import { PlaylistItem } from '../model/playlist-item';

export function applyTimeConstraint(video: PlaylistItem): boolean {
  let publishedDate = video.snippet?.publishedAt;

  let threshold: Date = new Date();
  threshold.setDate(new Date().getDate() - 1);

  if ((publishedDate: string): publishedDate is string => !!publishedDate) {
    let parsedDate = new Date(Date.parse(publishedDate!));
    return threshold <= parsedDate! && parsedDate! <= new Date();
  } else {
    return false;
  }
}
