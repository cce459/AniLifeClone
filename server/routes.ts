import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnimeSchema, insertEpisodeSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all animes
  app.get("/api/animes", async (req, res) => {
    try {
      const animes = await storage.getAnimes();
      res.json(animes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch animes" });
    }
  });

  // Get featured animes
  app.get("/api/animes/featured", async (req, res) => {
    try {
      const animes = await storage.getFeaturedAnimes();
      res.json(animes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured animes" });
    }
  });

  // Get latest animes
  app.get("/api/animes/latest", async (req, res) => {
    try {
      const animes = await storage.getLatestAnimes();
      res.json(animes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch latest animes" });
    }
  });

  // Get Korean animes
  app.get("/api/animes/korean", async (req, res) => {
    try {
      const animes = await storage.getKoreanAnimes();
      res.json(animes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Korean animes" });
    }
  });

  // Get anime by ID
  app.get("/api/animes/:id", async (req, res) => {
    try {
      const anime = await storage.getAnime(req.params.id);
      if (!anime) {
        return res.status(404).json({ message: "Anime not found" });
      }
      res.json(anime);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch anime" });
    }
  });

  // Search animes
  app.get("/api/animes/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      if (!query || query.trim().length < 2) {
        return res.status(400).json({ message: "Search query must be at least 2 characters" });
      }
      const animes = await storage.searchAnimes(query);
      res.json(animes);
    } catch (error) {
      res.status(500).json({ message: "Failed to search animes" });
    }
  });

  // Get animes by genre
  app.get("/api/animes/genre/:genre", async (req, res) => {
    try {
      const genre = req.params.genre;
      const animes = await storage.getAnimesByGenre(genre);
      res.json(animes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch animes by genre" });
    }
  });

  // Get episodes for an anime
  app.get("/api/animes/:id/episodes", async (req, res) => {
    try {
      const episodes = await storage.getEpisodesByAnimeId(req.params.id);
      res.json(episodes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch episodes" });
    }
  });

  // Get specific episode
  app.get("/api/episodes/:id", async (req, res) => {
    try {
      const episode = await storage.getEpisode(req.params.id);
      if (!episode) {
        return res.status(404).json({ message: "Episode not found" });
      }
      res.json(episode);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch episode" });
    }
  });

  // Create new anime
  app.post("/api/animes", async (req, res) => {
    try {
      const validation = insertAnimeSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid anime data",
          errors: validation.error.issues 
        });
      }
      
      const anime = await storage.createAnime(validation.data);
      res.status(201).json(anime);
    } catch (error) {
      res.status(500).json({ message: "Failed to create anime" });
    }
  });

  // Update watch progress
  app.post("/api/watch-progress", async (req, res) => {
    try {
      const { animeId, episodeId, userId, progressSeconds, completed } = req.body;
      
      if (!animeId || !episodeId || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const progress = await storage.updateWatchProgress({
        animeId,
        episodeId,
        userId,
        progressSeconds: progressSeconds || 0,
        completed: completed || false,
      });
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to update watch progress" });
    }
  });

  // Get watch progress for user
  app.get("/api/watch-progress/:userId/:animeId", async (req, res) => {
    try {
      const { userId, animeId } = req.params;
      const progress = await storage.getWatchProgress(userId, animeId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watch progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
