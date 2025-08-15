import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavigationHeader from "@/components/navigation-header";
import Footer from "@/components/footer";
import { type Anime } from "@shared/schema";

interface GenresPageProps {
  onPlayAnime: (anime: Anime) => void;
}

const genreCategories = [
  { name: "액션", icon: "🥊", description: "스릴 넘치는 액션 애니메이션", color: "hover:bg-accent-cyan hover:text-primary" },
  { name: "로맨스", icon: "❤️", description: "감동적인 로맨스 스토리", color: "hover:bg-accent-coral hover:text-white" },
  { name: "코미디", icon: "😄", description: "유쾌한 코미디 애니메이션", color: "hover:bg-warning hover:text-primary" },
  { name: "판타지", icon: "🔮", description: "환상적인 세계의 모험", color: "hover:bg-success hover:text-primary" },
  { name: "호러", icon: "👻", description: "오싹한 공포 애니메이션", color: "hover:bg-purple-500 hover:text-white" },
  { name: "학원", icon: "🎓", description: "청춘 학원물", color: "hover:bg-blue-500 hover:text-white" },
  { name: "드라마", icon: "🎭", description: "깊이 있는 드라마", color: "hover:bg-indigo-500 hover:text-white" },
  { name: "모험", icon: "🗺️", description: "신나는 모험 이야기", color: "hover:bg-green-500 hover:text-white" },
];

export default function GenresPage({ onPlayAnime }: GenresPageProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const { data: genreAnimes = [], isLoading } = useQuery<Anime[]>({
    queryKey: ["/api/animes/genre", selectedGenre],
    enabled: !!selectedGenre,
  });

  const { data: allAnimes = [] } = useQuery<Anime[]>({
    queryKey: ["/api/animes"],
  });

  return (
    <div className="min-h-screen bg-primary text-text-primary">
      <NavigationHeader onPlayAnime={onPlayAnime} />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-orbitron font-bold gradient-text mb-4" data-testid="text-genres-title">
              장르별 애니메이션
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-genres-subtitle">
              좋아하는 장르의 애니메이션을 찾아보세요
            </p>
          </div>

          {!selectedGenre ? (
            // Genre Selection Grid
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {genreCategories.map((genre) => (
                  <Card
                    key={genre.name}
                    className={`group bg-secondary rounded-xl p-8 text-center ${genre.color} transition-all duration-300 cursor-pointer hover:scale-105`}
                    onClick={() => setSelectedGenre(genre.name)}
                    data-testid={`card-genre-${genre.name}`}
                  >
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
                      {genre.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2" data-testid={`text-genre-name-${genre.name}`}>
                      {genre.name}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-current transition-colors duration-200 text-sm" data-testid={`text-genre-desc-${genre.name}`}>
                      {genre.description}
                    </p>
                  </Card>
                ))}
              </div>

              {/* Popular by Genre Preview */}
              <div className="mt-16">
                <h2 className="text-3xl font-bold gradient-text mb-8" data-testid="text-popular-preview-title">
                  장르별 인기작 미리보기
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {["액션", "로맨스", "판타지"].map((genre) => {
                    const genreAnimes = allAnimes.filter(anime => anime.genre === genre).slice(0, 3);
                    return (
                      <div key={genre} className="bg-secondary rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4 text-accent-cyan" data-testid={`text-preview-genre-${genre}`}>
                          {genre} 인기작
                        </h3>
                        <div className="space-y-3">
                          {genreAnimes.map((anime, index) => (
                            <div
                              key={anime.id}
                              className="flex items-center space-x-3 cursor-pointer hover:bg-primary rounded-lg p-2 transition-colors duration-200"
                              onClick={() => onPlayAnime(anime)}
                              data-testid={`card-preview-${genre}-${anime.id}`}
                            >
                              <img
                                src={anime.thumbnailUrl}
                                alt={anime.title}
                                className="w-12 h-16 object-cover rounded"
                                data-testid={`img-preview-${genre}-${anime.id}`}
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm truncate" data-testid={`text-preview-title-${genre}-${anime.id}`}>
                                  {anime.title}
                                </h4>
                                <p className="text-xs text-muted-foreground" data-testid={`text-preview-rating-${genre}-${anime.id}`}>
                                  ★ {anime.rating}
                                </p>
                              </div>
                              <span className="text-xs text-accent-coral">#{index + 1}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            // Selected Genre View
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setSelectedGenre(null)}
                    variant="ghost"
                    className="text-accent-cyan hover:text-accent-coral"
                    data-testid="button-back-to-genres"
                  >
                    ← 장르 목록으로
                  </Button>
                  <div>
                    <h2 className="text-3xl font-bold gradient-text" data-testid="text-selected-genre-title">
                      {selectedGenre} 애니메이션
                    </h2>
                    <p className="text-muted-foreground" data-testid="text-selected-genre-count">
                      총 {genreAnimes.length}편
                    </p>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-64 bg-secondary rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : genreAnimes.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {genreAnimes.map((anime) => (
                    <Card
                      key={anime.id}
                      className="anime-card bg-secondary rounded-lg overflow-hidden group cursor-pointer"
                      onClick={() => onPlayAnime(anime)}
                      data-testid={`card-genre-anime-${anime.id}`}
                    >
                      <div className="relative">
                        <img
                          src={anime.thumbnailUrl}
                          alt={anime.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          data-testid={`img-genre-anime-${anime.id}`}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                          <Button
                            className="opacity-0 group-hover:opacity-100 bg-accent-cyan text-primary px-4 py-2 rounded-lg font-medium transition-opacity duration-300"
                            data-testid={`button-play-genre-${anime.id}`}
                          >
                            시청하기
                          </Button>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm mb-1 truncate" data-testid={`text-genre-anime-title-${anime.id}`}>
                          {anime.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span data-testid={`text-genre-anime-episodes-${anime.id}`}>{anime.episodeCount}화</span>
                          <span data-testid={`text-genre-anime-rating-${anime.id}`}>★ {anime.rating}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📺</div>
                  <h3 className="text-2xl font-bold mb-4" data-testid="text-no-genre-results">
                    해당 장르의 애니메이션이 없습니다
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid="text-no-genre-results-subtitle">
                    다른 장르를 선택해보세요
                  </p>
                  <Button
                    className="bg-accent-cyan text-primary px-6 py-3 rounded-lg font-semibold"
                    onClick={() => setSelectedGenre(null)}
                    data-testid="button-back-to-genre-grid"
                  >
                    장르 목록으로 돌아가기
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}