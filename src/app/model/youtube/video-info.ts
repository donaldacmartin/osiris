export class VideoInfoContentDetails {
  duration?: string;
}

export class VideoInfoSnippet {
  categoryId?: string;
  description?: string;
  defaultLanguage?: string;
  publishedAt?: string;
  tags?: string[];
}

export class VideoInfo {
  id?: string;
  contentDetails?: VideoInfoContentDetails;
  snippet?: VideoInfoSnippet;
}
