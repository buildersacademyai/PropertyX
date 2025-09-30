CREATE TABLE "assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"location" text NOT NULL,
	"valuation" text NOT NULL,
	"tokens" text NOT NULL,
	"apr" text NOT NULL,
	"description" text NOT NULL,
	"staking" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tcoins" (
	"contract" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"asset_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listings" ALTER COLUMN "listing_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "tcoins" ADD CONSTRAINT "tcoins_contract_whitelisting_whitelisted_fk" FOREIGN KEY ("contract") REFERENCES "public"."whitelisting"("whitelisted") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tcoins" ADD CONSTRAINT "tcoins_asset_id_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_asset_contract_whitelisting_whitelisted_fk" FOREIGN KEY ("asset_contract") REFERENCES "public"."whitelisting"("whitelisted") ON DELETE no action ON UPDATE no action;