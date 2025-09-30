CREATE TABLE "listings" (
	"amount" integer NOT NULL,
	"asset_contract" text NOT NULL,
	"expiry" integer,
	"listing_id" integer PRIMARY KEY NOT NULL,
	"maker" text,
	"payment_asset_contract" text,
	"price" integer,
	"taker" text,
	"topic" text
);
