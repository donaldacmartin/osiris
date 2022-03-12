export class PlaylistItemResourceId {
  kind?: string;
  videoId?: string;
}

export class PlaylistItemThumbnail {
  url?: string;
}

export class PlaylistItemSnippet {
  publishedAt?: string;
  title?: string;
  channelTitle?: string;
  thumbnails?: Map<string, PlaylistItemThumbnail>;
  resourceId?: PlaylistItemResourceId;
}

export class PlaylistItem {
  snippet?: PlaylistItemSnippet;
}
