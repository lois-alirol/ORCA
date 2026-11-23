CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `restaurants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`description` text,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `menus` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`restaurant_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dishes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` real NOT NULL,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `allergens` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `allergens_name_unique` ON `allergens` (`name`);--> statement-breakpoint
CREATE TABLE `menu_dishes` (
	`menu_id` integer NOT NULL,
	`dish_id` integer NOT NULL,
	FOREIGN KEY (`menu_id`) REFERENCES `menus`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dish_categories` (
	`dish_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dish_allergens` (
	`dish_id` integer NOT NULL,
	`allergen_id` integer NOT NULL,
	FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`allergen_id`) REFERENCES `allergens`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
DROP TABLE `movies`;