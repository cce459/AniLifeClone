import { type Anime, type InsertAnime, type Episode, type InsertEpisode, type WatchProgress, type InsertWatchProgress } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Anime operations
  getAnime(id: string): Promise<Anime | undefined>;
  getAnimes(): Promise<Anime[]>;
  getFeaturedAnimes(): Promise<Anime[]>;
  getLatestAnimes(): Promise<Anime[]>;
  getKoreanAnimes(): Promise<Anime[]>;
  getAnimesByGenre(genre: string): Promise<Anime[]>;
  searchAnimes(query: string): Promise<Anime[]>;
  createAnime(anime: InsertAnime): Promise<Anime>;

  // Episode operations
  getEpisodesByAnimeId(animeId: string): Promise<Episode[]>;
  getEpisode(id: string): Promise<Episode | undefined>;
  createEpisode(episode: InsertEpisode): Promise<Episode>;

  // Watch progress operations
  getWatchProgress(userId: string, animeId: string): Promise<WatchProgress[]>;
  updateWatchProgress(progress: InsertWatchProgress): Promise<WatchProgress>;
}

export class MemStorage implements IStorage {
  private animes: Map<string, Anime>;
  private episodes: Map<string, Episode>;
  private watchProgresses: Map<string, WatchProgress>;

  constructor() {
    this.animes = new Map();
    this.episodes = new Map();
    this.watchProgresses = new Map();
    this.seedData();
  }

  private seedData() {
    // Featured Animes
    const featuredAnimes: InsertAnime[] = [
      {
        title: "진격의 거인 파이널 시즌",
        description: "인류의 운명을 건 최후의 전투가 시작된다. 엘런과 동료들의 마지막 이야기.",
        genre: "액션",
        rating: "9.8",
        episodeCount: 24,
        status: "완결",
        year: 2023,
        thumbnailUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        heroImageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        isKoreanOriginal: false,
        isFeatured: true,
        isLatest: true,
      },
      {
        title: "귀멸의 칼날 도공마을편",
        description: "탄지로와 네즈코의 새로운 모험. 도공마을에서 펼쳐지는 치열한 전투.",
        genre: "액션",
        rating: "9.5",
        episodeCount: 11,
        status: "완결",
        year: 2023,
        thumbnailUrl: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        isKoreanOriginal: false,
        isFeatured: true,
        isLatest: true,
      },
      {
        title: "주술회전 시부야 사변편",
        description: "시부야를 무대로 펼쳐지는 저주사들과 저주의 전면전쟁.",
        genre: "액션",
        rating: "9.3",
        episodeCount: 23,
        status: "방영중",
        year: 2023,
        thumbnailUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        isKoreanOriginal: false,
        isFeatured: true,
        isLatest: true,
      },
      {
        title: "원피스 와노쿠니편",
        description: "루피와 밀짚모자 일당의 와노쿠니에서의 대모험이 시작된다.",
        genre: "모험",
        rating: "9.7",
        episodeCount: 120,
        status: "방영중",
        year: 2023,
        thumbnailUrl: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        isKoreanOriginal: false,
        isFeatured: true,
        isLatest: false,
      }
    ];

    // Korean Original Animes
    const koreanAnimes: InsertAnime[] = [
      {
        title: "신의 탑",
        description: "탑을 오르는 소년의 모험을 그린 한국 웹툰 원작 애니메이션. 독특한 세계관과 매력적인 캐릭터들이 펼치는 대서사시.",
        genre: "액션",
        rating: "8.9",
        episodeCount: 13,
        status: "완결",
        year: 2020,
        thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        isKoreanOriginal: true,
        isFeatured: false,
        isLatest: false,
      },
      {
        title: "고스트메신저",
        description: "죽은 자들의 메시지를 전하는 특별한 능력을 가진 소년의 이야기. 한국적 정서가 담긴 감동적인 스토리.",
        genre: "드라마",
        rating: "8.7",
        episodeCount: 6,
        status: "완결",
        year: 2021,
        thumbnailUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        isKoreanOriginal: true,
        isFeatured: false,
        isLatest: false,
      }
    ];

    // Latest Animes
    const latestAnimes: InsertAnime[] = [
      {
        title: "체인소 맨",
        description: "악마와 계약한 소년의 잔혹한 이야기",
        genre: "액션",
        rating: "9.1",
        episodeCount: 12,
        status: "완결",
        year: 2023,
        thumbnailUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
        isKoreanOriginal: false,
        isFeatured: false,
        isLatest: true,
      },
      {
        title: "스파이 패밀리",
        description: "가짜 가족의 따뜻한 이야기",
        genre: "코미디",
        rating: "9.4",
        episodeCount: 25,
        status: "방영중",
        year: 2023,
        thumbnailUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
        isKoreanOriginal: false,
        isFeatured: false,
        isLatest: true,
      },
      {
        title: "나의 히어로 아카데미아",
        description: "히어로를 꿈꾸는 소년의 성장기",
        genre: "액션",
        rating: "8.8",
        episodeCount: 138,
        status: "방영중",
        year: 2023,
        thumbnailUrl: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
        isKoreanOriginal: false,
        isFeatured: false,
        isLatest: true,
      },
      {
        title: "이세계 아이돌",
        description: "다른 세계에서 아이돌이 된 소녀의 이야기",
        genre: "판타지",
        rating: "8.5",
        episodeCount: 12,
        status: "완결",
        year: 2023,
        thumbnailUrl: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
        isKoreanOriginal: false,
        isFeatured: false,
        isLatest: true,
      }
    ];

    // Create all animes
    [...featuredAnimes, ...koreanAnimes, ...latestAnimes].forEach(anime => {
      const id = randomUUID();
      const createdAnime: Anime = {
        ...anime,
        id,
        heroImageUrl: anime.heroImageUrl || null,
        isKoreanOriginal: anime.isKoreanOriginal ?? false,
        isFeatured: anime.isFeatured ?? false,
        isLatest: anime.isLatest ?? false,
        createdAt: new Date(),
      };
      this.animes.set(id, createdAnime);

      // Create sample episodes for each anime
      for (let i = 1; i <= Math.min(anime.episodeCount, 6); i++) {
        const episodeId = randomUUID();
        const episode: Episode = {
          id: episodeId,
          animeId: id,
          episodeNumber: i,
          title: `${i}화`,
          videoUrl: null,
          duration: "24:00",
          createdAt: new Date(),
        };
        this.episodes.set(episodeId, episode);
      }
    });
  }

  async getAnime(id: string): Promise<Anime | undefined> {
    return this.animes.get(id);
  }

  async getAnimes(): Promise<Anime[]> {
    return Array.from(this.animes.values());
  }

  async getFeaturedAnimes(): Promise<Anime[]> {
    return Array.from(this.animes.values()).filter(anime => anime.isFeatured);
  }

  async getLatestAnimes(): Promise<Anime[]> {
    return Array.from(this.animes.values()).filter(anime => anime.isLatest);
  }

  async getKoreanAnimes(): Promise<Anime[]> {
    return Array.from(this.animes.values()).filter(anime => anime.isKoreanOriginal);
  }

  async getAnimesByGenre(genre: string): Promise<Anime[]> {
    return Array.from(this.animes.values()).filter(anime => 
      anime.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  async searchAnimes(query: string): Promise<Anime[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.animes.values()).filter(anime =>
      anime.title.toLowerCase().includes(searchTerm) ||
      anime.description.toLowerCase().includes(searchTerm) ||
      anime.genre.toLowerCase().includes(searchTerm)
    );
  }

  async createAnime(insertAnime: InsertAnime): Promise<Anime> {
    const id = randomUUID();
    const anime: Anime = {
      ...insertAnime,
      id,
      heroImageUrl: insertAnime.heroImageUrl || null,
      isKoreanOriginal: insertAnime.isKoreanOriginal ?? false,
      isFeatured: insertAnime.isFeatured ?? false,
      isLatest: insertAnime.isLatest ?? false,
      createdAt: new Date(),
    };
    this.animes.set(id, anime);
    return anime;
  }

  async getEpisodesByAnimeId(animeId: string): Promise<Episode[]> {
    return Array.from(this.episodes.values())
      .filter(episode => episode.animeId === animeId)
      .sort((a, b) => a.episodeNumber - b.episodeNumber);
  }

  async getEpisode(id: string): Promise<Episode | undefined> {
    return this.episodes.get(id);
  }

  async createEpisode(insertEpisode: InsertEpisode): Promise<Episode> {
    const id = randomUUID();
    const episode: Episode = {
      ...insertEpisode,
      id,
      videoUrl: insertEpisode.videoUrl || null,
      createdAt: new Date(),
    };
    this.episodes.set(id, episode);
    return episode;
  }

  async getWatchProgress(userId: string, animeId: string): Promise<WatchProgress[]> {
    return Array.from(this.watchProgresses.values()).filter(
      progress => progress.userId === userId && progress.animeId === animeId
    );
  }

  async updateWatchProgress(insertProgress: InsertWatchProgress): Promise<WatchProgress> {
    const id = randomUUID();
    const progress: WatchProgress = {
      ...insertProgress,
      id,
      completed: insertProgress.completed ?? false,
      progressSeconds: insertProgress.progressSeconds ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.watchProgresses.set(id, progress);
    return progress;
  }
}

export const storage = new MemStorage();
