export interface CategorySnippet {
  title: string;
  assignable: boolean;
  channelId: string;
}

export interface Category {
  kind: string;
  etag: string;
  id: number;
  snippet: CategorySnippet;
}
