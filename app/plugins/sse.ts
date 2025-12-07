import { useClipperSubscriber } from "~/sse/subscribers/clipper";

export default defineNuxtPlugin(() => {
  // Only run on client
  if (import.meta.server) return;

  // Cleanup on app unmount
  const nuxtApp = useNuxtApp();
  nuxtApp.hook("app:mounted", () => {
    useClipperSubscriber();
    console.log("[SSE] Clipper subscription active");
  });
  nuxtApp.hook("app:beforeMount", () => {
    // Could add more SSE subscriptions here
  });
});
