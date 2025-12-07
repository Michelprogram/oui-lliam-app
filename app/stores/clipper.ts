import type { Maybe } from "@/utils/optional";
import type { Audio, AudioRequest, Selection,Video } from "~/types/clipper";

type ClipperStore = {
  kind: "success" | "loading" | "idle";
  videos: Video[];
  audios: Audio[];
  isUploadingAudio: boolean;
  audioRequest: Maybe<AudioRequest>;
  isOpen: boolean;
  selection: Maybe<Selection>;
};

export const useClipperStore = defineStore("clipper", () => {
  const state = useState<ClipperStore>("clipper", () => ({
    kind: "idle",
    videos: [],
    audios: [],
    isUploadingAudio: false,
    audioRequest: undefined,
    isOpen: false,
    selection: undefined,
  }));

  return {
    state,
  };
});
