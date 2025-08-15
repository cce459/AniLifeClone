import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Anime } from "@shared/schema";
import AnimeCardActions from "@/components/anime-card-actions";

interface LatestAnimeGridProps {
  onPlayAnime: (anime: Anime) => void;
}

export default function LatestAnimeGrid({ onPlayAnime }: LatestAnimeGridProps) {
  const { data: latestAnimes = [], isLoading } = useQuery<Anime[]>({
    queryKey: ["/api/animes/latest"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="h-56 bg-secondary rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-primary" data-testid="latest-anime-section">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold gradient-text" data-testid="text-latest-title">
            최신 업데이트
          </h3>
          <div className="flex items-center space-x-4">
            <Select>
              <SelectTrigger className="w-32 bg-secondary border-gray-600 text-text-primary" data-testid="select-filter-status">
                <SelectValue placeholder="전체" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="completed">완결</SelectItem>
                <SelectItem value="ongoing">방영중</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              className="text-accent-cyan hover:text-accent-coral transition-colors duration-200 font-medium"
              data-testid="button-filter"
            >
              필터 <Filter className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {latestAnimes.map((anime, index) => (
            <Card
              key={anime.id}
              className="anime-card bg-secondary rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => onPlayAnime(anime)}
              data-testid={`card-latest-${anime.id}`}
            >
              <div className="relative">
                <img
                  src={anime.thumbnailUrl}
                  alt={anime.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  data-testid={`img-latest-${anime.id}`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Play className="text-white h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <AnimeCardActions anime={anime} />
                {index < 2 && (
                  <div className="absolute top-2 right-2 bg-accent-coral text-white text-xs px-2 py-1 rounded">
                    NEW
                  </div>
                )}
                {index === 7 && (
                  <div className="absolute top-2 right-2 bg-warning text-primary text-xs px-2 py-1 rounded">
                    HOT
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm mb-1 truncate" data-testid={`text-latest-title-${anime.id}`}>
                  {anime.title}
                </h4>
                <p className="text-muted-foreground text-xs" data-testid={`text-latest-episodes-${anime.id}`}>
                  {anime.episodeCount}화
                </p>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            className="bg-accent-cyan text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200"
            data-testid="button-load-more"
          >
            더 많은 애니 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
