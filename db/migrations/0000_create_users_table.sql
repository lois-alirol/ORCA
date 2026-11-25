CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'staff' NOT NULL,
	CONSTRAINT "users_role_check" CHECK("users"."role" in ('admin', 'manager', 'staff'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `menus` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `dishes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`price_cents` integer NOT NULL,
	CONSTRAINT "dishes_price_cents_nonnegative" CHECK("dishes"."price_cents" >= 0)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
CREATE TABLE `allergens` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `allergens_name_unique` ON `allergens` (`name`);--> statement-breakpoint
CREATE TABLE `dish_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dish_id` integer NOT NULL,
	`file_path` text NOT NULL,
	`alt_text` text,
	`position` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "dish_images_position_nonnegative" CHECK("dish_images"."position" >= 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dish_images_dish_file_unique` ON `dish_images` (`dish_id`,`file_path`);--> statement-breakpoint
CREATE TABLE `menu_dishes` (
	`menu_id` integer NOT NULL,
	`dish_id` integer NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`menu_id`, `dish_id`),
	FOREIGN KEY (`menu_id`) REFERENCES `menus`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "menu_dishes_position_nonnegative" CHECK("menu_dishes"."position" >= 0)
);
--> statement-breakpoint
CREATE INDEX `menu_dishes_dish_id_idx` ON `menu_dishes` (`dish_id`);--> statement-breakpoint
CREATE TABLE `dish_categories` (
	`dish_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	PRIMARY KEY(`dish_id`, `category_id`),
	FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `dish_categories_category_id_idx` ON `dish_categories` (`category_id`);--> statement-breakpoint
CREATE TABLE `dish_allergens` (
	`dish_id` integer NOT NULL,
	`allergen_id` integer NOT NULL,
	PRIMARY KEY(`dish_id`, `allergen_id`),
	FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`allergen_id`) REFERENCES `allergens`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `dish_allergens_allergen_id_idx` ON `dish_allergens` (`allergen_id`);