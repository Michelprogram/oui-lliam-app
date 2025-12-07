<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import type { Audio } from "~/types/clipper";

import { useForm } from "./useForm";

const { audio } = defineProps<{
  audio: Audio;
}>();

const { transcription, isResizing, onResize, onInsertEmotion, emotions } =
  useForm({
    audio: () => audio,
  });
</script>
<template>
  <div class="h-full grid grid-cols-1 grid-rows-[1fr_1fr_0.2fr]">
    <div
      class="col-span-full flex flex-col items-start justify-center p-0 size-full"
    >
      <div ref="containerElement" class="w-full" />
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex gap-2">
        <Badge
          variant="secondary"
          class="cursor-pointer"
          @click="onInsertEmotion(emotion)"
          v-for="(emotion, index) in emotions"
          :key="index"
          >{{ emotion }}
        </Badge>
      </div>
      <textarea
        ref="textElement"
        v-model="transcription"
        class="h-[300px] resize-none border-2 rounded-sm p-1.5"
      />
    </div>

    <div class="size-full flex flex-col gap-2 justify-center">
      <Button :disabled="isResizing" @click="onResize">
        {{ isResizing ? "Resizing..." : "Resize" }}
      </Button>
    </div>
  </div>
</template>
