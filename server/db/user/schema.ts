import { bigint,integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

import { UserRole } from "../../../shared/db/user";

export function enumToPgEnum<T extends Record<string, string>>(
  myEnum: T
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum) as [T[keyof T], ...T[keyof T][]];
}

export const userRoleEnum = pgEnum("user_role", enumToPgEnum(UserRole));

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  tokenType: text("token_type").notNull(),
  accessToken: text("access_token").notNull(),
  expireAt: bigint("expire_at", { mode: "number" }).notNull(),
  refreshToken: text("refresh_token").notNull(),
  scope: text("scope").notNull(),
  discordId: text("discord_id").notNull(),
  username: text("username").notNull(),
  avatar: text("avatar").notNull(),
  globalName: text("global_name").notNull(),
  role: userRoleEnum("role").default(UserRole.USER).notNull(),
  decorationAsset: text("decoration_asset"),
  decorationSkuId: text("decoration_sku_id"),
});
