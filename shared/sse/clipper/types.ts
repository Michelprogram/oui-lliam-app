type ClipDataBase = {
  language: string;
  id: number;
  filename: string;
  publicPath: string;
  fullPath: string;
  transcription: string;
  createdAt: Date;
};

export type ClipCreatedData = ClipDataBase;

export type ClipUpdatedData = ClipDataBase;

export type ClipDeletedData = {
  id: number;
};

export type ClipEventType =
  | { type: "created"; data: ClipCreatedData }
  | { type: "deleted"; data: ClipDeletedData }
  | { type: "updated"; data: ClipCreatedData };
