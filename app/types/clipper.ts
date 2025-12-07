type Common = {
  name: string;
  directory: string;
  url: string;
};

export type Video = Common & {
  type: "video";
};

export type Audio = {
  id: number;
  filename: string;
  publicPath: string;
  fullPath: string;
  transcription: string;
  language: string;
  createdAt: Date;
  type: "audio";
};

export type Selection = Audio | Video;

export type AudioRequest = Omit<Audio, "type">;
