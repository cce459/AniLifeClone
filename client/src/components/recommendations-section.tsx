import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, TrendingUp } from "lucide-react";
import { type Anime } from "@shared/schema";
import AnimeCardActions from "@/components/anime-card-actions";

interface RecommendationsSectionProps {
  onPlayAnime: (anime: Anime) => void;
}

export default function RecommendationsSection({ onPlayAnime }: RecommendationsSectionProps) {
  const { data: allAnimes = [] } = useQuery<Anime[]>({
    queryKey: ["/api/animes"],
  });

  // Get user's watch history and favorites for recommendations
  const watchHistory = JSON.parse(localStorage.getItem('anilife_watch_history') || '[]');
  const favorites = JSON.parse(localStorage.getItem('anilife_favorites') || '[]');
  
  // Simple recommendation algorithm based on user preferences
  const getRecommendations = (): Anime[] => {
    if (allAnimes.length === 0) return [];
    
    // Get genres from user's favorites and watch history
    const userGenres = new Set<string>();
    
    favorites.forEach((favoriteId: string) => {
      const anime = allAnimes.find(a => a.id === favoriteId);
      if (anime) userGenres.add(anime.genre);
    });
    
    watchHistory.slice(0, 5).forEach((item: any) => {
      userGenres.add(item.anime.genre);
    });
    
    // If no preferences, recommend high-rated animes
    if (userGenres.size === 0) {
      return allAnimes
        .filter(anime => !favorites.includes(anime.id))
        .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
        .slice(0, 8);
    }
    
    // Recommend based on user's preferred genres
    const recommendations = allAnimes
      .filter(anime => 
        !favorites.includes(anime.id) && 
        !watchHistory.some((item: any) => item.anime.id === anime.id) &&
        userGenres.has(anime.genre)
      )
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, 6);
    
    // If not enough recommendations, fill with high-rated animes
    if (recommendations.length < 6) {
      const additional = allAnimes
        .filter(anime => 
          !favorites.includes(anime.id) && 
          !recommendations.some(rec => rec.id === anime.id) &&
          !watchHistory.some((item: any) => item.anime.id === anime.id)
        )
        .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
        .slice(0, 6 - recommendations.length);
      
      recommendations.push(...additional);
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-secondary to-primary" data-testid="recommendations-section">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-accent-cyan" />
            <div>
              <h3 className="text-3xl font-bold gradient-text" data-testid="text-recommendations-title">
                당신을 위한 추천
              </h3>
              <p className="text-muted-foreground mt-1" data-testid="text-recommendations-subtitle">
                시청 기록과 취향을 바탕으로 선별한 애니메이션
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-accent-cyan hover:text-accent-coral transition-colors duration-200 font-medium"
            onClick={() => {
              // Refresh recommendations by clearing and reloading
              window.location.reload();
            }}
            data-testid="button-refresh-recommendations"
          >
            새로고침
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recommendations.map((anime, index) => (
            <Card
              key={anime.id}
              className="anime-card bg-secondary rounded-lg overflow-hidden group cursor-pointer relative"
              onClick={() => onPlayAnime(anime)}
              data-testid={`card-recommendation-${anime.id}`}
            >
              <div className="relative">
                <img
                  src={anime.thumbnailUrl}
                  alt={anime.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  data-testid={`img-recommendation-${anime.id}`}
                />
                
                {/* Recommendation ranking */}
                <div className="absolute top-2 left-2 bg-accent-cyan text-primary text-xs px-2 py-1 rounded-full font-bold">
                  #{index + 1}
                </div>
                
                <AnimeCardActions anime={anime} />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <Button
                    className="opacity-0 group-hover:opacity-100 bg-accent-cyan text-primary px-4 py-2 rounded-lg font-medium transition-opacity duration-300"
                    data-testid={`button-play-recommendation-${anime.id}`}
                  >
                    시청하기
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm mb-1 truncate" data-testid={`text-recommendation-title-${anime.id}`}>
                  {anime.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span data-testid={`text-recommendation-genre-${anime.id}`}>{anime.genre}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-warning fill-current" />
                    <span data-testid={`text-recommendation-rating-${anime.id}`}>{anime.rating}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm" data-testid="text-recommendation-info">
            💡 더 정확한 추천을 위해 애니메이션을 시청하고 즐겨찾기에 추가해보세요
          </p>
        </div>
      </div>
    </section>
  );
}