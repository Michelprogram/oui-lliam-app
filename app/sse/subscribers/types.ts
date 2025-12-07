export type ClipData = {
  id?: number;
  filename: string;
  publicPath: string;
  transcription?: string;
  language?: string;
};

export type ClipEventType = "created" | "deleted" | "updated";
