export interface Video {
  id: string;
  title: string;
  description: string;
  channel: string;
  tags: string[];
  category: string;
  language: string;
  thumbnail: string;
  ageAtSelection: number;
  duration: number;
  placeInList?: number;
}
