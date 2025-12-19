
export interface PosterData {
  title: string;
  speakerName: string;
  speakerTitle: string;
  speakerBio: string;
  speakerPhoto: string;
  agenda: string[];
  time: string;
  location: string;
  eventDate: string;
  themeColor: string;
  template: 'modern' | 'corporate' | 'minimal';
}

export interface NotionSettings {
  apiKey: string;
  databaseId: string;
}

export enum ExportStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SYNCING = 'SYNCING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
