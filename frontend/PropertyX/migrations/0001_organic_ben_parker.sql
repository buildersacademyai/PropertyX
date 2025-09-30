CREATE TABLE "whitelisting" (
	"whitelisted" text PRIMARY KEY NOT NULL,
	"is_whitelisted" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listings" ALTER COLUMN "expiry" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "listings" ALTER COLUMN "maker" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "listings" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "listings" ALTER COLUMN "topic" SET NOT NULL;