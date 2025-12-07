import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const clips = sqliteTable("clips", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  filename: text("filename").notNull(),
  publicPath: text("public_path").notNull(),
  fullPath: text("full_path").notNull(),
  transcription: text("transcription").notNull(),
  language: text("language").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .defaultNow()
    .notNull(),
});
