import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const animes = pgTable("animes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  genre: text("genre").notNull(),
  rating: text("rating").notNull(),
  episodeCount: integer("episode_count").notNull(),
  status: text("status").notNull(), // "완결", "방영중"
  year: integer("year").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  heroImageUrl: text("hero_image_url"),
  isKoreanOriginal: boolean("is_korean_original").default(false),
  isFeatured: boolean("is_featured").default(false),
  isLatest: boolean("is_latest").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const episodes = pgTable("episodes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  animeId: varchar("anime_id").notNull().references(() => animes.id),
  episodeNumber: integer("episode_number").notNull(),
  title: text("title").notNull(),
  videoUrl: text("video_url"),
  duration: text("duration").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const watchProgress = pgTable("watch_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  animeId: varchar("anime_id").notNull().references(() => animes.id),
  episodeId: varchar("episode_id").notNull().references(() => episodes.id),
  userId: varchar("user_id").notNull(),
  progressSeconds: integer("progress_seconds").default(0),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAnimeSchema = createInsertSchema(animes).omit({
  id: true,
  createdAt: true,
});

export const insertEpisodeSchema = createInsertSchema(episodes).omit({
  id: true,
  createdAt: true,
});

export const insertWatchProgressSchema = createInsertSchema(watchProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertAnime = z.infer<typeof insertAnimeSchema>;
export type Anime = typeof animes.$inferSelect;
export type InsertEpisode = z.infer<typeof insertEpisodeSchema>;
export type Episode = typeof episodes.$inferSelect;
export type InsertWatchProgress = z.infer<typeof insertWatchProgressSchema>;
export type WatchProgress = typeof watchProgress.$inferSelect;
