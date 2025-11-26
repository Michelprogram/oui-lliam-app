<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Element from "~/components/own/layouts/default/Element.vue";
import Theme from "~/components/own/layouts/default/Theme.vue";
import { Pages } from "~/utils/constants/pages";
</script>

<template>
  <div class="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
    <!-- Sidebar -->
    <div class="bg-midnight-light">
      <div class="grid grid-rows-[auto_1fr_auto] h-full">
        <div class="flex items-center gap-2 p-4">
          <Avatar class="size-[48px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <!-- Sidebar content -->
        <div class="flex flex-col gap-3 p-4">
          <Element name="Bot" :link="Pages.Bot.link" />
          <Element name="UsersRound" :link="Pages.Swords.link" />
          <Element name="Logs" :link="Pages.Swords.link" />
        </div>

        <!-- Sidebar footer -->
        <div class="flex flex-col gap-3 p-4">
          <Element name="Settings" :link="Pages.Settings.link" />
          <Theme />
        </div>
      </div>
    </div>

    <!-- Main content area with grid (top and bottom) -->
    <main class="grid grid-rows-[auto_1fr] h-full overflow-hidden">
      <!-- Top content -->
      <div class="overflow-y-auto">
        <slot name="top" />
      </div>

      <!-- Bottom content -->
      <div class="overflow-y-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
