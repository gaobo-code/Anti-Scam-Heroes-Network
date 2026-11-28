CREATE TABLE "administrator_sessions" (
	"token_hash" text PRIMARY KEY NOT NULL,
	"administrator_id" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "administrators" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "administrators_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"login_attempts" integer DEFAULT 0 NOT NULL,
	"attempt_window_started_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "administrators_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "administrator_sessions" ADD CONSTRAINT "administrator_sessions_administrator_id_administrators_id_fk" FOREIGN KEY ("administrator_id") REFERENCES "public"."administrators"("id") ON DELETE cascade ON UPDATE no action;