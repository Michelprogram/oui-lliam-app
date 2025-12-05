<script lang="ts" setup>
import FirstChat from "./FirstChat.vue";

const welcomesPhrases = (username: string) =>{
  const phrases = [
    `Hello ${username}, how can I assist you today?`,
    `Welcome back ${username}! What would you like to discuss?`,
    `Hi ${username}! I'm here to help you with anything you need.`,
    `Good to see you again ${username}! What can I do for you?`,
    `Hey ${username}, ready to chat? Ask me anything!`
  ];

  return phrases[Math.floor(Math.random() * phrases.length)];
}
</script>
<template>
  <div class="flex-1 min-h-0 flex flex-col">
    <div
      class="bg-secondary rounded-lg flex-1 flex-col min-h-0 size-full flex justify-center items-center p-8"
    >
        <p class="text-3xl py-8">{{welcomesPhrases("21Shrek")}}</p>
      <FirstChat />
    </div>
  </div>
</template>
