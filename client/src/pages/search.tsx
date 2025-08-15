import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NavigationHeader from "@/components/navigation-header";
import Footer from "@/components/footer";
import { type Anime } from "@shared/schema";

interface SearchPageProps {
  onPlayAnime: (anime: Anime) => void;
}

export default function SearchPage({ onPlayAnime }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [location] = useLocation();

  // Extract search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const query = params.get('q');
    if (query) {
      setSearchQuery(decodeURIComponent(query));
    }
  }, [location]);

  const { data: searchResults = [], isLoading } = useQuery<Anime[]>({
    queryKey: ["/api/animes/search", searchQuery],
    enabled: searchQuery.length >= 2,
  });

  const { data: allAnimes = [] } = useQuery<Anime[]>({
    queryKey: ["/api/animes"],
    enabled: searchQuery.length < 2,
  });

  const filteredResults = (searchQuery.length >= 2 ? searchResults : allAnimes).filter(anime => {
    const genreMatch = selectedGenre === "all" || anime.genre === selectedGenre;
    const statusMatch = selectedStatus === "all" || anime.status === selectedStatus;
    return genreMatch && statusMatch;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const genres = ["액션", "로맨스", "코미디", "판타지", "호러", "학원", "드라마", "모험"];

  return (
    <div className="min-h-screen bg-primary text-text-primary">
      <NavigationHeader onPlayAnime={onPlayAnime} />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-orbitron font-bold gradient-text mb-4" data-testid="text-search-title">
              애니메이션 검색
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-search-subtitle">
              원하는 애니메이션을 찾아보세요
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative mb-6">
              <Input
                type="text"
                placeholder="제목, 장르, 설명으로 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-secondary border-gray-600 rounded-lg px-6 py-4 pl-14 text-lg focus:border-accent-cyan"
                data-testid="input-search-main"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
            </form>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-40 bg-secondary border-gray-600 text-text-primary" data-testid="select-genre">
                  <SelectValue placeholder="장르" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 장르</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32 bg-secondary border-gray-600 text-text-primary" data-testid="select-status">
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="완결">완결</SelectItem>
                  <SelectItem value="방영중">방영중</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-primary"
                data-testid="button-reset-filters"
                onClick={() => {
                  setSelectedGenre("all");
                  setSelectedStatus("all");
                  setSearchQuery("");
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                필터 초기화
              </Button>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-64 bg-secondary rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-muted-foreground" data-testid="text-results-count">
                    총 {filteredResults.length}개의 결과
                    {searchQuery && ` "${searchQuery}"에 대한 검색 결과`}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredResults.map((anime) => (
                    <Card
                      key={anime.id}
                      className="anime-card bg-secondary rounded-lg overflow-hidden group cursor-pointer"
                      onClick={() => onPlayAnime(anime)}
                      data-testid={`card-search-result-${anime.id}`}
                    >
                      <div className="relative">
                        <img
                          src={anime.thumbnailUrl}
                          alt={anime.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          data-testid={`img-search-result-${anime.id}`}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                          <Button
                            className="opacity-0 group-hover:opacity-100 bg-accent-cyan text-primary px-4 py-2 rounded-lg font-medium transition-opacity duration-300"
                            data-testid={`button-play-search-${anime.id}`}
                          >
                            시청하기
                          </Button>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm mb-1 truncate" data-testid={`text-search-title-${anime.id}`}>
                          {anime.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span data-testid={`text-search-genre-${anime.id}`}>{anime.genre}</span>
                          <span data-testid={`text-search-rating-${anime.id}`}>★ {anime.rating}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-4" data-testid="text-no-results">
                  검색 결과가 없습니다
                </h3>
                <p className="text-muted-foreground mb-6" data-testid="text-no-results-subtitle">
                  다른 키워드로 검색해보세요
                </p>
                <Button
                  className="bg-accent-cyan text-primary px-6 py-3 rounded-lg font-semibold"
                  onClick={() => setSearchQuery("")}
                  data-testid="button-clear-search"
                >
                  전체 애니 보기
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}