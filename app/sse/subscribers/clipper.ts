import type {
  ClipCreatedData,
  ClipDeletedData,
  ClipEventType,
  ClipUpdatedData,
} from "#shared/sse/clipper/types";
import { useClipperService } from "~/services/clipper";

import { defineSSESubscriber } from "../index";

export const useClipperSubscriber = () => {
  const service = useClipperService();

  const created = (data: ClipCreatedData) => {
    service.addAudio({
      ...data,
      type: "audio",
    });
  };

  const deleted = (data: ClipDeletedData) =>
    service.deleteAudioFromStore(data.id);

  const updated = (data: ClipUpdatedData) =>
    service.updateAudio(data.id, {
      ...data,
      type: "audio",
    });

  return defineSSESubscriber<ClipEventType>("/api/clipper/events", {
    created,
    deleted,
    updated,
  });
};
