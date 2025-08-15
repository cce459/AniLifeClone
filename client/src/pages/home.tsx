import NavigationHeader from "@/components/navigation-header";
import HeroSection from "@/components/hero-section";
import FeaturedAnimeCarousel from "@/components/featured-anime-carousel";
import CategoryGrid from "@/components/category-grid";
import LatestAnimeGrid from "@/components/latest-anime-grid";
import KoreanPopularSection from "@/components/korean-popular-section";
import VideoPlayerModal from "@/components/video-player-modal";
import Footer from "@/components/footer";
import { useVideoPlayer } from "@/hooks/use-video-player";

export default function Home() {
  const { isOpen, anime, episodes, openPlayer, closePlayer } = useVideoPlayer();

  return (
    <div className="min-h-screen bg-primary text-text-primary">
      <NavigationHeader onPlayAnime={openPlayer} />
      
      <main className="pt-20">
        <HeroSection onPlayAnime={openPlayer} />
        <FeaturedAnimeCarousel onPlayAnime={openPlayer} />
        <CategoryGrid />
        <LatestAnimeGrid onPlayAnime={openPlayer} />
        <KoreanPopularSection onPlayAnime={openPlayer} />
      </main>

      <Footer />
      
      <VideoPlayerModal
        isOpen={isOpen}
        anime={anime}
        episodes={episodes}
        onClose={closePlayer}
      />
    </div>
  );
}
