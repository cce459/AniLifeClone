import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Play } from "lucide-react";
import { type Anime } from "@shared/schema";

interface KoreanPopularSectionProps {
  onPlayAnime: (anime: Anime) => void;
}

export default function KoreanPopularSection({ onPlayAnime }: KoreanPopularSectionProps) {
  const { data: koreanAnimes = [], isLoading } = useQuery({
    queryKey: ["/api/animes/korean"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-secondary to-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-96 bg-secondary rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-secondary to-primary" data-testid="korean-popular-section">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold gradient-text" data-testid="text-korean-title">
              K-아니메이션 특집
            </h3>
            <p className="text-muted-foreground mt-2" data-testid="text-korean-subtitle">
              한국의 독특한 애니메이션을 만나보세요
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button
              className="bg-accent-coral text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors duration-200"
              data-testid="button-sort-popular"
            >
              🔥 인기순
            </Button>
            <Button
              variant="outline"
              className="border border-accent-cyan text-accent-cyan px-4 py-2 rounded-lg font-medium hover:bg-accent-cyan hover:text-primary transition-all duration-200"
              data-testid="button-sort-latest"
            >
              최신순
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {koreanAnimes.slice(0, 2).map((anime: Anime) => (
            <Card
              key={anime.id}
              className="anime-card bg-secondary rounded-xl overflow-hidden cursor-pointer"
              onClick={() => onPlayAnime(anime)}
              data-testid={`card-korean-${anime.id}`}
            >
              <img
                src={anime.thumbnailUrl}
                alt={anime.title}
                className="w-full h-48 object-cover"
                data-testid={`img-korean-${anime.id}`}
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-accent-coral text-white text-xs px-3 py-1 rounded-full font-medium">
                    KOREAN ORIGINAL
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-warning fill-current" />
                    <span className="text-muted-foreground text-sm" data-testid={`text-korean-rating-${anime.id}`}>
                      {anime.rating}
                    </span>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-3" data-testid={`text-korean-title-${anime.id}`}>
                  {anime.title}
                </h4>
                <p className="text-muted-foreground mb-4" data-testid={`text-korean-description-${anime.id}`}>
                  {anime.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-accent-cyan font-medium" data-testid={`text-korean-episodes-${anime.id}`}>
                      {anime.episodeCount}화 {anime.status}
                    </span>
                    <span className="text-muted-foreground text-sm" data-testid={`text-korean-year-${anime.id}`}>
                      {anime.year}년
                    </span>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayAnime(anime);
                    }}
                    className="bg-accent-cyan text-primary px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200"
                    data-testid={`button-korean-play-${anime.id}`}
                  >
                    시청하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Additional Korean Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {koreanAnimes.slice(2).map((anime: Anime) => (
            <Card
              key={anime.id}
              className="anime-card bg-primary rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => onPlayAnime(anime)}
              data-testid={`card-korean-small-${anime.id}`}
            >
              <div className="relative">
                <img
                  src={anime.thumbnailUrl}
                  alt={anime.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  data-testid={`img-korean-small-${anime.id}`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Play className="text-white h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm truncate" data-testid={`text-korean-small-title-${anime.id}`}>
                  {anime.title}
                </h4>
                <p className="text-muted-foreground text-xs">극장판</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
