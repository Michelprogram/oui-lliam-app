import { EventEmitter } from "events";
import type { H3Event } from "h3";

export const defineSSEHub = <TEvents extends Record<string, unknown>>() => {
  const emitter = new EventEmitter();

  return {
    emit<K extends keyof TEvents>(event: K, data: TEvents[K]) {
      emitter.emit(event as string, data);
    },
    on<K extends keyof TEvents>(
      event: K,
      listener: (data: TEvents[K]) => void
    ) {
      emitter.on(event as string, listener);
      return () => emitter.removeListener(event as string, listener);
    },
  };
};

export const defineSSEHandler = <T>(
  hub: ReturnType<typeof defineSSEHub<Record<string, T>>>,
  eventName: string
) => {
  return defineEventHandler((event: H3Event) => {
    setHeader(event, "Content-Type", "text/event-stream");
    setHeader(event, "Cache-Control", "no-cache");
    setHeader(event, "Connection", "keep-alive");

    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(": ping\n\n"));

        const cleanup = hub.on(eventName as keyof typeof hub, (data) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
        });

        event.node.req.on("close", () => {
          cleanup();
          controller.close();
        });
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  });
};
