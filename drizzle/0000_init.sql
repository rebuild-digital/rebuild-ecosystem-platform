CREATE TYPE "public"."platform_priority" AS ENUM('top', 'next', 'last', 'save_for_later', 'discarded');--> statement-breakpoint
CREATE TYPE "public"."platform_stage" AS ENUM('concept', 'alpha', 'beta', 'growth', 'shut_down');--> statement-breakpoint
CREATE TYPE "public"."platform_status" AS ENUM('published', 'draft');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug"),
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "platform_categories" (
	"platform_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "platform_categories_platform_id_category_id_pk" PRIMARY KEY("platform_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "platforms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"website" text,
	"country" text,
	"logo_url" text,
	"stage" "platform_stage",
	"founding_year" integer,
	"notion_id" text,
	"status" "platform_status" DEFAULT 'draft' NOT NULL,
	"priority" "platform_priority",
	"contact_name" text,
	"contact_info" text,
	"notes" text,
	"enrichment" jsonb,
	"publish_date" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "platforms_slug_unique" UNIQUE("slug"),
	CONSTRAINT "platforms_notionId_unique" UNIQUE("notion_id")
);
--> statement-breakpoint
ALTER TABLE "platform_categories" ADD CONSTRAINT "platform_categories_platform_id_platforms_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platforms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platform_categories" ADD CONSTRAINT "platform_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "platform_categories_category_id_index" ON "platform_categories" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "platforms_status_index" ON "platforms" USING btree ("status");