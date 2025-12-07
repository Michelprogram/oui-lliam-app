import { type ReadonlyRefOrGetter } from "@vueuse/core";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin, {
  type Region,
} from "wavesurfer.js/dist/plugins/regions.esm.js";

import { useClipperService } from "~/services/clipper";
import type { Audio } from "~/types/clipper";

type Options = {
  audio: ReadonlyRefOrGetter<Audio>;
};

export const useForm = (options: Options) => {
  const { audio } = options;
  const { resizeAudio } = useClipperService();
  const isResizing = ref(false);

  const containerElement = useTemplateRef<HTMLElement>("containerElement");
  const textAreaElement = useTemplateRef<HTMLTextAreaElement>("textElement");

  const activeRegion = ref<Maybe<Region>>(null);
  const wavesurfer = shallowRef<Maybe<WaveSurfer>>(null);

  const emotions = ref<string[]>([
    "laugh",
    "chuckle",
    "sigh",
    "cough",
    "sniffle",
    "groan",
    "yawn",
    "gasp",
  ]);

  const transcription = computed({
    get: () => {
      return toValue(audio).transcription;
    },
    set: (value) => {
      toValue(audio).transcription = value;
    },
  });

  const init = (container: HTMLElement) => {
    const region = RegionsPlugin.create();

    wavesurfer.value = WaveSurfer.create({
      container: container,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      mediaControls: true,
      barWidth: 8,
      barGap: 1,
      barRadius: 8,
      minPxPerSec: 4,
      url: toValue(audio).publicPath,
      plugins: [region],
    });

    wavesurfer.value.on("ready", () => {
      const duration = wavesurfer.value!.getDuration();

      activeRegion.value = region.addRegion({
        start: 0,
        end: duration, // 5 seconds or full duration if shorter
        color: "rgba(0, 255, 0, 0.3)",
        drag: true,
        resize: true,
      });
    });
  };

  onMounted(() => {
    const container = toValue(containerElement);

    if (isAbsent(container)) return;
    init(container);
  });

  const onResize = async () => {
    if (isAbsent(activeRegion.value) || isAbsent(wavesurfer.value)) return;

    const start = activeRegion.value.start;
    const end = activeRegion.value.end;
    const audioId = toValue(audio).id;

    try {
      isResizing.value = true;
      await resizeAudio(audioId, start, end);

      // Reload the audio after resize
      wavesurfer.value.load(toValue(audio).publicPath + `?t=${Date.now()}`);
    } catch (error) {
      console.error("Failed to resize audio:", error);
    } finally {
      isResizing.value = false;
    }
  };

  const onInsertEmotion = (emotion: string) => {
    if (isAbsent(textAreaElement.value)) return;

    const start = textAreaElement.value.selectionStart;
    const emotionText = `<${emotion}>`;

    transcription.value =
      transcription.value.slice(0, start) +
      emotionText +
      transcription.value.slice(start);
  };

  return {
    wavesurfer,
    activeRegion,
    transcription,
    isResizing,
    emotions,
    onInsertEmotion,
    onResize,
  };
};
