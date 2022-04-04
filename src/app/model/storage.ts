export interface TrainingVideo {
  title: string;
  description: string;
  channel: string;
  tags: string[];
  category: string;
  language: string;
  ageAtSelection: number;
  duration: number;
  placeInList?: number;
}

export interface TrainingDate {
  accepted: TrainingVideo[];
  rejected: TrainingVideo[];
}

export interface TrainingData {
  data: Map<Date, TrainingData>;
}
