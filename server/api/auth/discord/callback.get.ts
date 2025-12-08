import { eq } from "drizzle-orm";
import { setCookie } from "h3";

import { useDiscord } from "~~/server/utils/discord";

import { postgres } from "../../../db";
import { users as usersTable } from "../../../db/user/schema";

export default defineEventHandler(async (event) => {
  const { code } = getQuery<{ code: string }>(event);

  const { getAccessToken, getUserInfo } = useDiscord();

  const tokens = await getAccessToken(code);

  const user = await getUserInfo(tokens.access_token);

  const [exist] = await postgres
    .select()
    .from(usersTable)
    .where(eq(usersTable.discordId, user.id));

  const values = {
    tokenType: tokens.token_type,
    accessToken: tokens.access_token,
    expireAt: new Date().getTime() + tokens.expires_in,
    refreshToken: tokens.refresh_token,
    scope: tokens.scope,
    discordId: user.id,
    username: user.username,
    avatar: user.avatar,
    globalName: user.global_name,
    decorationAsset: user.avatar_decoration_data.asset,
    decorationSkuId: user.avatar_decoration_data.sku_id,
  };

  if (isAbsent(exist)) {
    await postgres.insert(usersTable).values(values);
  } else {
    await postgres
      .update(usersTable)
      .set(values)
      .where(eq(usersTable.discordId, user.id));
  }

  setCookie(event, "auth", user.id);

  return sendRedirect(event, "/", 302);
});
