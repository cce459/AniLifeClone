import { Button } from "@/components/ui/button";
import { Play, Plus, ArrowDown } from "lucide-react";
import { type Anime } from "@shared/schema";
import AnimeCardActions from "@/components/anime-card-actions";

interface HeroSectionProps {
  onPlayAnime: (anime: Anime) => void;
}

export default function HeroSection({ onPlayAnime }: HeroSectionProps) {
  // Featured hero anime
  const heroAnime: Anime = {
    id: "hero-anime",
    title: "진격의 거인 파이널 시즌",
    description: "인류의 운명을 건 최후의 전투가 시작된다.",
    genre: "액션",
    rating: "9.8",
    episodeCount: 24,
    status: "완결",
    year: 2023,
    thumbnailUrl: "",
    heroImageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    isKoreanOriginal: false,
    isFeatured: true,
    isLatest: true,
    createdAt: new Date(),
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 hero-gradient"
        style={{
          backgroundImage: `url('${heroAnime.heroImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 gradient-text animate-fade-in" data-testid="text-hero-title">
          무한한 애니 세계로
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up" data-testid="text-hero-subtitle">
          최신 애니메이션을 HD 화질로 무료 시청하세요
        </p>
        
        {/* Featured Anime Info */}
        <div className="bg-black bg-opacity-50 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-2 text-accent-cyan" data-testid="text-featured-anime-title">
            오늘의 추천: {heroAnime.title}
          </h3>
          <p className="text-muted-foreground mb-4" data-testid="text-featured-anime-description">
            {heroAnime.description}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="bg-accent-coral px-3 py-1 rounded-full">{heroAnime.genre}</span>
            <span className="text-warning">★ {heroAnime.rating}</span>
            <span className="text-muted-foreground">{heroAnime.episodeCount}화 {heroAnime.status}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button
            onClick={() => onPlayAnime(heroAnime)}
            className="bg-accent-cyan text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-200 animate-glow"
            data-testid="button-watch-now"
          >
            <Play className="mr-2 h-5 w-5" />
            지금 시청하기
          </Button>
          <Button
            variant="outline"
            className="border-2 border-accent-coral text-accent-coral px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-coral hover:text-white transition-all duration-200"
            onClick={() => {
              const favorites = JSON.parse(localStorage.getItem('anilife_favorites') || '[]');
              if (!favorites.includes(heroAnime.id)) {
                favorites.push(heroAnime.id);
                localStorage.setItem('anilife_favorites', JSON.stringify(favorites));
              }
            }}
            data-testid="button-add-to-list"
          >
            <Plus className="mr-2 h-5 w-5" />
            내 목록에 추가
          </Button>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-8 right-8 w-14 h-14 bg-accent-coral rounded-full hover:animate-glow transition-all duration-200"
        data-testid="button-scroll-down"
      >
        <ArrowDown className="h-6 w-6 text-white" />
      </Button>
    </section>
  );
}
