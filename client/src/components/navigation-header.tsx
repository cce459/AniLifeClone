import { useState } from "react";
import { Link } from "wouter";
import { Search, Menu, Play, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Anime } from "@shared/schema";

interface NavigationHeaderProps {
  onPlayAnime: (anime: Anime) => void;
}

export default function NavigationHeader({ onPlayAnime }: NavigationHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect" data-testid="navigation-header">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3" data-testid="link-home">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-coral rounded-lg flex items-center justify-center">
                <Play className="text-white h-5 w-5" />
              </div>
              <h1 className="text-2xl font-orbitron font-bold gradient-text">애니라이프</h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-text-primary hover:text-accent-cyan transition-colors duration-200 font-medium" data-testid="link-home-nav">
                홈
              </Link>
              <Link href="/latest" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200" data-testid="link-latest">
                최신작
              </Link>
              <Link href="/popular" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200" data-testid="link-popular">
                인기작
              </Link>
              <Link href="/genres" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200" data-testid="link-genres">
                장르별
              </Link>
              <Link href="/mylist" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200" data-testid="link-mylist">
                내 목록
              </Link>
            </div>
            
            {/* Search and User */}
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <Input
                  type="text"
                  placeholder="애니메이션 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-secondary border-gray-600 rounded-lg px-4 py-2 pl-10 w-64 focus:border-accent-cyan"
                  data-testid="input-search"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </form>
              
              {/* User Profile */}
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 bg-accent-coral rounded-full hover:animate-glow"
                data-testid="button-profile"
              >
                <User className="h-4 w-4 text-white" />
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Mobile Navigation */}
      <div
        className={`mobile-nav lg:hidden fixed bottom-0 left-0 right-0 bg-secondary border-t border-gray-600 p-4 z-40 ${
          mobileMenuOpen ? "active" : ""
        }`}
        data-testid="mobile-navigation"
      >
        <div className="flex justify-around">
          <Link href="/" className="flex flex-col items-center space-y-1 text-accent-cyan" data-testid="link-mobile-home">
            <div className="text-lg">🏠</div>
            <span className="text-xs">홈</span>
          </Link>
          <Link href="/latest" className="flex flex-col items-center space-y-1 text-muted-foreground" data-testid="link-mobile-latest">
            <div className="text-lg">🔥</div>
            <span className="text-xs">최신작</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center space-y-1 text-muted-foreground" data-testid="link-mobile-search">
            <Search className="h-5 w-5" />
            <span className="text-xs">검색</span>
          </Link>
          <Link href="/favorites" className="flex flex-col items-center space-y-1 text-muted-foreground" data-testid="link-mobile-favorites">
            <div className="text-lg">❤️</div>
            <span className="text-xs">내 목록</span>
          </Link>
        </div>
      </div>
    </>
  );
}
