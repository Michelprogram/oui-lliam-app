<script setup lang="ts">
import { Ellipsis } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMessagesStore } from "@/stores/message";
import { useFetch } from "#app";

const autoScroll = defineModel<boolean>("autoScroll", { required: true });

const store = useMessagesStore();

const onReset = async () => {
  await useFetch("/api/inference/reset");
  store.clear();
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon">
        <Ellipsis />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="start">
      <DropdownMenuLabel>Settings</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <div class="flex items-center space-x-2">
            <Switch id="airplane-mode" v-model:model-value="autoScroll" />
            <Label for="airplane-mode">Auto scroll</Label>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p @click="onReset" class="size-full">Reset</p>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
