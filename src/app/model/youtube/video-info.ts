export class VideoInfoContentDetails {
  duration?: string;
}

export class VideoInfoSnippet {
  categoryId?: number;
  description?: string;
  defaultLanguage?: string;
  publishedAt?: Date;
  tags?: string[];
}

export class VideoInfo {
  id?: string;
  contentDetails?: VideoInfoContentDetails;
  snippet?: VideoInfoSnippet;
}
