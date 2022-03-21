import { PlaylistItem } from './playlist-item';
import { VideoInfoContentDetails } from './video-info';

export class AugmentedPlaylistItem extends PlaylistItem {
  contentDetails?: VideoInfoContentDetails;
}
