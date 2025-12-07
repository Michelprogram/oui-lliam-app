<script lang="ts" setup>
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useClipperService } from "~/services/clipper";

const isOpen = defineModel<boolean>("isOpen", { required: true });

const emit = defineEmits<{
  (e: "on-cancel"): void;
  (e: "on-save"): void;
}>();

const onCancel = () => {
  emit("on-cancel");
  isOpen.value = false;
};

const onSave = () => {
  emit("on-save");
  isOpen.value = false;
};

const { audioRequest } = useClipperService();
</script>

<template>
  <Dialog :open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Speech to text result</DialogTitle>
        <DialogDescription>
          Audio has been translate as follow
        </DialogDescription>
      </DialogHeader>
      <div v-if="isAbsent(audioRequest)" class="flex flex-col gap-1.5">
        <Skeleton class="h-[300px] rounded-sm" />
        <Skeleton class="h-[50px] rounded-sm" />
      </div>
      <div v-else class="flex flex-col gap-1.5">
        <Textarea
          v-model:model-value="audioRequest.transcription"
          class="h-[300px]"
        />
        <div class="w-full h-[50px]">
          <audio controls class="w-full">
            <source :src="audioRequest.publicPath" type="audio/wav" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      </div>

      <DialogFooter>
        <DialogClose>
          <Button class="cursor-pointer" variant="outline" @click="onCancel">
            Cancel
          </Button>
        </DialogClose>
        <Button
          class="cursor-pointer"
          type="submit"
          @click="onSave"
          :disabled="isAbsent(audioRequest)"
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
