type ExtractEventType<T> = T extends { type: infer U } ? U : never;
type ExtractDataByType<T, Type> = T extends { type: Type; data: infer D }
  ? D
  : never;

export const defineSSESubscriber = <
  TEvent extends { type: string; data: unknown }
>(
  path: string,
  listeners: {
    [K in ExtractEventType<TEvent>]?: (
      data: ExtractDataByType<TEvent, K>
    ) => void;
  }
) => {
  const eventSource = new EventSource(path);

  eventSource.onmessage = (event) => {
    const parsed = JSON.parse(event.data) as TEvent;
    const handler = listeners[parsed.type as ExtractEventType<TEvent>];

    if (handler) handler(parsed.data as never);
  };

  eventSource.onerror = () => {
    console.error("SSE connection error, reconnecting...");
    eventSource.close();
  };

  return eventSource;
};
