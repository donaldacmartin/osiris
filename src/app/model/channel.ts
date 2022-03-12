export class ChannelRelatedPlaylists {
  uploads?: string;
}

export class ChannelContentDetails {
  relatedPlaylists?: ChannelRelatedPlaylists;
}

export class Channel {
  contentDetails?: ChannelContentDetails;
}
