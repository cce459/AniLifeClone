import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Play, Clock, CheckCircle } from "lucide-react";
import NavigationHeader from "@/components/navigation-header";
import Footer from "@/components/footer";
import { type Anime } from "@shared/schema";

interface MyListPageProps {
  onPlayAnime: (anime: Anime) => void;
}

// Local storage keys
const FAVORITES_KEY = "anilife_favorites";
const WATCH_LATER_KEY = "anilife_watch_later";
const WATCH_HISTORY_KEY = "anilife_watch_history";

interface WatchHistoryItem {
  anime: Anime;
  lastWatched: string;
  progress: number;
  completed: boolean;
}

export default function MyListPage({ onPlayAnime }: MyListPageProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [watchLater, setWatchLater] = useState<string[]>([]);
  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>([]);

  const { data: allAnimes = [] } = useQuery<Anime[]>({
    queryKey: ["/api/animes"],
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    const savedWatchLater = localStorage.getItem(WATCH_LATER_KEY);
    const savedWatchHistory = localStorage.getItem(WATCH_HISTORY_KEY);

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedWatchLater) setWatchLater(JSON.parse(savedWatchLater));
    if (savedWatchHistory) setWatchHistory(JSON.parse(savedWatchHistory));
  }, []);

  // Get anime data for each category
  const favoriteAnimes = allAnimes.filter(anime => favorites.includes(anime.id));
  const watchLaterAnimes = allAnimes.filter(anime => watchLater.includes(anime.id));
  const continueWatching = watchHistory.filter(item => !item.completed && item.progress > 0);
  const completedAnimes = watchHistory.filter(item => item.completed);

  const addToFavorites = (animeId: string) => {
    const newFavorites = [...favorites, animeId];
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (animeId: string) => {
    const newFavorites = favorites.filter(id => id !== animeId);
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const addToWatchLater = (animeId: string) => {
    const newWatchLater = [...watchLater, animeId];
    setWatchLater(newWatchLater);
    localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(newWatchLater));
  };

  const removeFromWatchLater = (animeId: string) => {
    const newWatchLater = watchLater.filter(id => id !== animeId);
    setWatchLater(newWatchLater);
    localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(newWatchLater));
  };

  const removeFromHistory = (animeId: string) => {
    const newHistory = watchHistory.filter(item => item.anime.id !== animeId);
    setWatchHistory(newHistory);
    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const AnimeGrid = ({ animes, showProgress = false, historyItems = [] }: { 
    animes: Anime[], 
    showProgress?: boolean,
    historyItems?: WatchHistoryItem[]
  }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {animes.map((anime) => {
        const historyItem = historyItems.find(item => item.anime.id === anime.id);
        return (
          <Card
            key={anime.id}
            className="anime-card bg-secondary rounded-lg overflow-hidden group cursor-pointer"
            data-testid={`card-mylist-${anime.id}`}
          >
            <div className="relative">
              <img
                src={anime.thumbnailUrl}
                alt={anime.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                onClick={() => onPlayAnime(anime)}
                data-testid={`img-mylist-${anime.id}`}
              />
              {showProgress && historyItem && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
                  <div className="w-full bg-gray-600 rounded-full h-1.5 mb-1">
                    <div 
                      className="bg-accent-cyan h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${historyItem.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-white text-center">
                    {historyItem.completed ? "완료" : `${historyItem.progress}% 시청`}
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <Button
                  onClick={() => onPlayAnime(anime)}
                  className="opacity-0 group-hover:opacity-100 bg-accent-cyan text-primary px-4 py-2 rounded-lg font-medium transition-opacity duration-300"
                  data-testid={`button-play-mylist-${anime.id}`}
                >
                  시청하기
                </Button>
              </div>
            </div>
            <div className="p-3">
              <h4 className="font-semibold text-sm mb-2 truncate" data-testid={`text-mylist-title-${anime.id}`}>
                {anime.title}
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <span data-testid={`text-mylist-episodes-${anime.id}`}>{anime.episodeCount}화</span>
                  <span>•</span>
                  <span data-testid={`text-mylist-rating-${anime.id}`}>★ {anime.rating}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-400 hover:text-red-300"
                  onClick={() => {
                    if (favorites.includes(anime.id)) removeFromFavorites(anime.id);
                    if (watchLater.includes(anime.id)) removeFromWatchLater(anime.id);
                    if (showProgress) removeFromHistory(anime.id);
                  }}
                  data-testid={`button-remove-${anime.id}`}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );

  // Expose functions globally for other components to use
  useEffect(() => {
    (window as any).anilife = {
      addToFavorites,
      addToWatchLater,
      addToHistory: (anime: Anime, progress: number = 0, completed: boolean = false) => {
        const newHistoryItem: WatchHistoryItem = {
          anime,
          lastWatched: new Date().toISOString(),
          progress,
          completed
        };
        const newHistory = watchHistory.filter(item => item.anime.id !== anime.id);
        newHistory.unshift(newHistoryItem);
        setWatchHistory(newHistory.slice(0, 50)); // Keep only last 50 items
        localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(newHistory.slice(0, 50)));
      }
    };
  }, [favorites, watchLater, watchHistory]);

  return (
    <div className="min-h-screen bg-primary text-text-primary">
      <NavigationHeader onPlayAnime={onPlayAnime} />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-orbitron font-bold gradient-text mb-4" data-testid="text-mylist-title">
              내 목록
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-mylist-subtitle">
              관심 있는 애니메이션을 저장하고 관리하세요
            </p>
          </div>

          <Tabs defaultValue="continue" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-secondary mb-8">
              <TabsTrigger value="continue" className="flex items-center space-x-2" data-testid="tab-continue">
                <Play className="h-4 w-4" />
                <span>이어보기</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center space-x-2" data-testid="tab-favorites">
                <span>❤️</span>
                <span>즐겨찾기</span>
              </TabsTrigger>
              <TabsTrigger value="watchlater" className="flex items-center space-x-2" data-testid="tab-watchlater">
                <Clock className="h-4 w-4" />
                <span>나중에 보기</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center space-x-2" data-testid="tab-completed">
                <CheckCircle className="h-4 w-4" />
                <span>완료</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="continue" data-testid="content-continue">
              {continueWatching.length > 0 ? (
                <AnimeGrid 
                  animes={continueWatching.map(item => item.anime)} 
                  showProgress={true}
                  historyItems={continueWatching}
                />
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📺</div>
                  <h3 className="text-2xl font-bold mb-4" data-testid="text-no-continue">
                    시청 중인 애니메이션이 없습니다
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid="text-no-continue-subtitle">
                    새로운 애니메이션을 시청해보세요
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="favorites" data-testid="content-favorites">
              {favoriteAnimes.length > 0 ? (
                <AnimeGrid animes={favoriteAnimes} />
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">❤️</div>
                  <h3 className="text-2xl font-bold mb-4" data-testid="text-no-favorites">
                    즐겨찾기 목록이 비어있습니다
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid="text-no-favorites-subtitle">
                    좋아하는 애니메이션을 즐겨찾기에 추가해보세요
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="watchlater" data-testid="content-watchlater">
              {watchLaterAnimes.length > 0 ? (
                <AnimeGrid animes={watchLaterAnimes} />
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🕒</div>
                  <h3 className="text-2xl font-bold mb-4" data-testid="text-no-watchlater">
                    나중에 보기 목록이 비어있습니다
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid="text-no-watchlater-subtitle">
                    관심 있는 애니메이션을 나중에 보기 목록에 추가해보세요
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" data-testid="content-completed">
              {completedAnimes.length > 0 ? (
                <AnimeGrid 
                  animes={completedAnimes.map(item => item.anime)}
                  showProgress={true}
                  historyItems={completedAnimes}
                />
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold mb-4" data-testid="text-no-completed">
                    완료한 애니메이션이 없습니다
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid="text-no-completed-subtitle">
                    애니메이션을 끝까지 시청하면 여기에 표시됩니다
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}