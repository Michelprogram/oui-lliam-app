CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"token_type" text NOT NULL,
	"access_token" text NOT NULL,
	"expires_in" integer NOT NULL,
	"refresh_token" text NOT NULL,
	"scope" text NOT NULL,
	"discord_id" text NOT NULL,
	"username" text NOT NULL,
	"avatar" text NOT NULL,
	"global_name" text NOT NULL,
	"banner_color" text NOT NULL,
	"decoration_asset" text,
	"decoration_sku_id" text
);
