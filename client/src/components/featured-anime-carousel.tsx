import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";
import { type Anime } from "@shared/schema";

interface FeaturedAnimeCarouselProps {
  onPlayAnime: (anime: Anime) => void;
}

export default function FeaturedAnimeCarousel({ onPlayAnime }: FeaturedAnimeCarouselProps) {
  const { data: featuredAnimes = [], isLoading } = useQuery({
    queryKey: ["/api/animes/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-80 h-96 bg-secondary rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-primary to-secondary" data-testid="featured-anime-section">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold gradient-text" data-testid="text-featured-title">오늘의 추천작</h3>
          <Button
            variant="ghost"
            className="text-accent-cyan hover:text-accent-coral transition-colors duration-200 font-medium"
            data-testid="button-view-all-featured"
          >
            전체보기 <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="scroll-container overflow-x-auto pb-4">
          <div className="flex space-x-6 w-max">
            {featuredAnimes.map((anime: Anime) => (
              <Card
                key={anime.id}
                className="anime-card bg-secondary rounded-xl overflow-hidden w-80 flex-shrink-0 cursor-pointer"
                onClick={() => onPlayAnime(anime)}
                data-testid={`card-featured-${anime.id}`}
              >
                <div className="relative">
                  <img
                    src={anime.thumbnailUrl}
                    alt={anime.title}
                    className="w-full h-48 object-cover"
                    data-testid={`img-featured-${anime.id}`}
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent-cyan text-sm font-medium" data-testid={`text-genre-${anime.id}`}>
                      {anime.genre}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-warning fill-current" />
                      <span className="text-sm text-muted-foreground" data-testid={`text-rating-${anime.id}`}>
                        {anime.rating}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2" data-testid={`text-title-${anime.id}`}>
                    {anime.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4" data-testid={`text-description-${anime.id}`}>
                    {anime.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent-coral font-medium" data-testid={`text-episodes-${anime.id}`}>
                      {anime.episodeCount}화 {anime.status}
                    </span>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayAnime(anime);
                      }}
                      className="bg-accent-cyan text-primary px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors duration-200"
                      data-testid={`button-play-${anime.id}`}
                    >
                      시청하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
