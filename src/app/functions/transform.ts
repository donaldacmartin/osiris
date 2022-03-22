import { AugmentedPlaylistItem } from '../model/augmented-playlist-item';
import { PlaylistItem } from '../model/playlist-item';
import { VideoInfo } from '../model/video-info';

export function chunk<T>(items: T[], size: number): T[][] {
  if (items.length <= size) {
    return [items];
  } else {
    let startIndexes = [...Array(Math.ceil(items.length / size)).keys()].map(
      (x) => x * size
    );

    return startIndexes.map((i) =>
      items.slice(i, i + size < items.length ? i + size : items.length + 1)
    );
  }
}

export function augment(
  videos: PlaylistItem[],
  videoInfos: VideoInfo[]
): AugmentedPlaylistItem[] {
  let videoInfoMap = videoInfos.reduce((map, videoInfo) => {
    if (videoInfo.id) {
      map.set(videoInfo.id, videoInfo);
    }

    return map;
  }, new Map());

  return videos.map((v) => {
    let augmentedItem = v as AugmentedPlaylistItem;
    augmentedItem.contentDetails = videoInfoMap.get(
      v.snippet?.resourceId?.videoId!
    ).contentDetails;
    return augmentedItem;
  });
}
