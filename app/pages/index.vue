<script setup lang="ts">
import { ChatBox } from "~/components/own/home/ChatBox";
import { Header } from "~/components/own/home/Header";
</script>
<template>
  <main
    class="grid grid-rows-[0.1fr_1fr] h-screen min-h-0 bg-white dark:bg-dark-secondary p-6 overflow-hidden"
  >
    <Header />
    <ChatBox />
  </main>
</template>
