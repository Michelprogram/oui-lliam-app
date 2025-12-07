import type { ClipEventType } from "../../../shared/sse/clipper/types";
import { defineSSEHandler, defineSSEHub } from "../../utils/sse";

type ClipEvents = {
  "clip-change": ClipEventType;
};

export const clipHub = defineSSEHub<ClipEvents>();

export default defineSSEHandler(clipHub, "clip-change");
