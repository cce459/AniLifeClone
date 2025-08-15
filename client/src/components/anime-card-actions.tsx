import { useState, useEffect } from "react";
import { Heart, Clock, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Anime } from "@shared/schema";

interface AnimeCardActionsProps {
  anime: Anime;
  showProgress?: boolean;
  onAddToHistory?: (anime: Anime, progress: number, completed: boolean) => void;
}

const FAVORITES_KEY = "anilife_favorites";
const WATCH_LATER_KEY = "anilife_watch_later";

export default function AnimeCardActions({ anime, showProgress = false, onAddToHistory }: AnimeCardActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    const watchLater = JSON.parse(localStorage.getItem(WATCH_LATER_KEY) || "[]");
    
    setIsFavorite(favorites.includes(anime.id));
    setIsWatchLater(watchLater.includes(anime.id));
  }, [anime.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    
    if (isFavorite) {
      const newFavorites = favorites.filter((id: string) => id !== anime.id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      const newFavorites = [...favorites, anime.id];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setIsFavorite(true);
    }
  };

  const toggleWatchLater = (e: React.MouseEvent) => {
    e.stopPropagation();
    const watchLater = JSON.parse(localStorage.getItem(WATCH_LATER_KEY) || "[]");
    
    if (isWatchLater) {
      const newWatchLater = watchLater.filter((id: string) => id !== anime.id);
      localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(newWatchLater));
      setIsWatchLater(false);
    } else {
      const newWatchLater = [...watchLater, anime.id];
      localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(newWatchLater));
      setIsWatchLater(true);
    }
  };

  return (
    <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Button
        variant="secondary"
        size="icon"
        className={`w-8 h-8 rounded-full ${isFavorite ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70'} transition-all duration-200`}
        onClick={toggleFavorite}
        data-testid={`button-favorite-${anime.id}`}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
      </Button>
      
      <Button
        variant="secondary"
        size="icon"
        className={`w-8 h-8 rounded-full ${isWatchLater ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70'} transition-all duration-200`}
        onClick={toggleWatchLater}
        data-testid={`button-watch-later-${anime.id}`}
      >
        {isWatchLater ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
      </Button>
    </div>
  );
}