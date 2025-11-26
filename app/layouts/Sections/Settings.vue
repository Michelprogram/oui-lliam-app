<script setup lang="ts">
import Element from "~/components/own/layouts/default/Element.vue";
import { Pages } from "~/utils/constants/pages";
</script>

<template>
  <Element :name="Pages.Settings.icon" :link="Pages.Settings.link" />
</template>
