<script setup lang="ts">
import { computed } from "vue";


// Mock YouTube video ID - replace with actual live stream ID
const videoId = "dQw4w9WgXcQ"; // Example video ID
const youtubeEmbedUrl = computed(
  () => `https://www.youtube.com/embed/${videoId}?autoplay=1`
);
</script>

<template>
  <div class="flex flex-col h-full gap-4">
    <!-- YouTube Video Embed -->
    <div
      class="relative size-full aspect-video bg-black rounded-lg overflow-hidden"
    >
      <iframe
        :src="youtubeEmbedUrl"
        class="size-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  </div>
</template>
