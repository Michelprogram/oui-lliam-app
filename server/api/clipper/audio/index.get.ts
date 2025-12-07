import { db } from "../../../db";
import { clips as clipsTable } from "../../../db/clipper/schema";

export default defineEventHandler(async () => {
  return await db
    .select()
    .from(clipsTable)
    .then((clips) =>
      clips.map((clip) => ({
        ...clip,
        type: "audio",
      }))
    );
});
