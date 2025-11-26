<script setup lang="ts">
import { ref } from "vue";
import { VideoPlayer, VideoEditing, ClipHistory } from "~/components/own/video";

const showCreateClipDialog = ref(false);

const handleClipSave = (clipData: { title: string; duration: string }) => {
  console.log("Clip saved:", clipData);
  // Handle clip save logic here
};
</script>

<template>
  <div>
    <div class="h-screen grid grid-cols-6 grid-rows-6 gap-6 p-6">
      <!-- Left side: Video Player -->
      <VideoPlayer class="col-span-4 h-full row-span-4" />

      <ClipHistory class="col-span-2 row-span-full col-start-5 min-h-0" />

      <!-- Video Editing Controls -->
      <VideoEditing
        class="row-start-5 row-span-full col-span-4"
        @create-clip="showCreateClipDialog = true"
      />
    </div>
  </div>
</template>
