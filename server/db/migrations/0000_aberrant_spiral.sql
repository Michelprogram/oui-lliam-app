CREATE TABLE `clips` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`filename` text NOT NULL,
	`public_path` text NOT NULL,
	`full_path` text NOT NULL,
	`transcription` text NOT NULL,
	`language` text NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
