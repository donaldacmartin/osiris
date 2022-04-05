export class VideoInfoContentDetails {
  duration?: string;
}

export class VideoInfoSnippet {
  categoryId?: string;
  description?: string;
  language?: string;
  publishedAt?: string;
  tags?: string[];
}

export class VideoInfo {
  id?: string;
  contentDetails?: VideoInfoContentDetails;
  snippet?: VideoInfoSnippet;
}
