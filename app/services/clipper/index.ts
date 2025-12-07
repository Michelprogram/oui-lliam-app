import { useClipperStore } from "@/stores/clipper";
import type { Audio, Video } from "~/types/clipper";

export const useClipperService = () => {
  const { state } = useClipperStore();

  const selection = computed({
    get: () => state.selection,
    set: (value) => (state.selection = value),
  });

  const groupedByDirectories = <T>(items: T[], directory: keyof T) => {
    return items.reduce((acc, item) => {
      (acc[item[directory] as string] ??= []).push(item);
      return acc;
    }, {} as Record<string, T[]>);
  };

  const addAudio = (audio: Audio) => state.audios.push(audio);

  const updateAudio = (id: number, audio: Audio) => {
    const idx = state.audios.findIndex((a) => a.id === id);
    if (idx !== -1) {
      state.audios[idx] = audio;
    }
  };

  const videos = computed(() =>
    groupedByDirectories(state.videos, "directory")
  );

  const audios = computed(() => groupedByDirectories(state.audios, "language"));

  const uploadAudio = async (formData: FormData) => {
    return await $fetch("/api/clipper/audio", {
      method: "POST",
      body: formData,
    });
  };

  const fetchVideos = async () => {
    state.videos = await $fetch<Video[]>("/api/clipper/videos");
  };

  const fetchAudios = async () => {
    state.audios = await $fetch<Audio[]>("/api/clipper/audio");
  };

  const doingUploadAudio = async <T>(cb: () => Promise<T>): Promise<T> => {
    try {
      state.isUploadingAudio = true;
      return await cb();
    } finally {
      state.isUploadingAudio = false;
    }
  };

  const isUploadingAudio = computed(() => state.isUploadingAudio);

  const audioRequest = computed({
    get: () => {
      return state.audioRequest;
    },
    set: (value) => {
      state.audioRequest = value;
    },
  });

  const deleteAudioFromStore = (id: number) => {
    state.audios = state.audios.filter((a) => a.id !== id);
  };

  const deleteAudio = async (id: number) => {
    return await $fetch(`/api/clipper/audio?id=${id}`, {
      method: "DELETE",
    });
  };

  const resizeAudio = async (id: number, start: number, end: number) => {
    return await $fetch("/api/clipper/audio", {
      method: "PATCH",
      body: { id, start, end },
    });
  };

  const deleteAudioDirectory = async (language: string) => {
    return await $fetch(`/api/clipper/audio/directory?language=${language}`, {
      method: "DELETE",
    });
  };

  return {
    videos,
    audios,
    audioRequest,
    selection,
    isUploadingAudio,
    updateAudio,
    resizeAudio,
    doingUploadAudio,
    deleteAudioFromStore,
    fetchVideos,
    fetchAudios,
    uploadAudio,
    deleteAudio,
    deleteAudioDirectory,
    addAudio,
  };
};
