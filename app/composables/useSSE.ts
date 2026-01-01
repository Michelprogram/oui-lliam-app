import type { ProcessingRiotEventJob } from "~~/shared/sse/inference/type";

export const useSSE = (callbacks: {
  onMessage: (data: ProcessingRiotEventJob) => void;
}) => {
  const state = useState("sse-state", () => ({
    connected: false,
    connecting: false,
    error: null as string | null,
    retryCount: 0,
    maxRetries: 5,
  }));

  let eventSource: Maybe<EventSource> = null;

  const startListening = () => {
    if (eventSource) return;

    eventSource = new EventSource("/api/inference/stream");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        callbacks.onMessage(data);
      } catch (err) {
        console.error("[Inference SSE] Parse error:", err);
      }
    };

    eventSource.onerror = () => {
      state.value.error = "Stream connection lost";
    };
  };

  return {
    state,
    startListening,
  };
};
