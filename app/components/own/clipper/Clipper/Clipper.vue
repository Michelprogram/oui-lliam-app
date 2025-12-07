<script setup lang="ts">
import { Video as VideoIcon } from "lucide-vue-next";

import { type Maybe } from "@/utils/optional";
import type { Selection } from "~/types/clipper";

import Audio from "./Audio/Container.vue";
import Video from "./Video/Container.vue";

const { activeSelection } = defineProps<{
  activeSelection: Maybe<Selection>;
}>();
</script>
<template>
  <div
    v-if="isAbsent(activeSelection)"
    class="h-full flex flex-col items-center justify-center gap-6 bg-linear-to-br from-zinc-900 via-zinc-950 to-black rounded-2xl border border-zinc-800/50 relative overflow-hidden"
  >
    <!-- Animated background glow -->
    <div class="absolute inset-0 opacity-30">
      <div
        class="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"
      />
      <div
        class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700"
      />
    </div>

    <!-- Icon -->
    <div
      class="relative z-10 p-6 rounded-full bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm"
    >
      <VideoIcon color="gray" :size="80" />
    </div>

    <!-- Text -->
    <div class="relative z-10 text-center space-y-2">
      <h3 class="text-xl font-semibold text-zinc-300 tracking-tight">
        No clip selected
      </h3>
      <p class="text-sm text-zinc-500 max-w-xs">
        Pick a video from the left panel to start clipping, or select an
        existing clip to preview
      </p>
    </div>
  </div>
  <Audio
    :key="activeSelection.id"
    v-else-if="activeSelection.type === 'audio'"
    :audio="activeSelection"
  />
  <Video v-else :video="activeSelection" />
</template>
