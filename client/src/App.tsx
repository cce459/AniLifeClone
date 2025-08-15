import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import SearchPage from "@/pages/search";
import GenresPage from "@/pages/genres";
import MyListPage from "@/pages/my-list";
import NotFound from "@/pages/not-found";
import VideoPlayerModal from "@/components/video-player-modal";
import { useVideoPlayer } from "@/hooks/use-video-player";

function Router() {
  const { isOpen, anime, episodes, openPlayer, closePlayer } = useVideoPlayer();

  return (
    <>
      <Switch>
        <Route path="/" component={() => <Home />} />
        <Route path="/search" component={() => <SearchPage onPlayAnime={openPlayer} />} />
        <Route path="/genres" component={() => <GenresPage onPlayAnime={openPlayer} />} />
        <Route path="/mylist" component={() => <MyListPage onPlayAnime={openPlayer} />} />
        <Route component={NotFound} />
      </Switch>
      
      <VideoPlayerModal
        isOpen={isOpen}
        anime={anime}
        episodes={episodes}
        onClose={closePlayer}
      />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-primary text-text-primary font-korean">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
