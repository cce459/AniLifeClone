import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack } from "lucide-react";
import { type Anime, type Episode } from "@shared/schema";

interface VideoPlayerModalProps {
  isOpen: boolean;
  anime: Anime | null;
  episodes: Episode[];
  onClose: () => void;
}

export default function VideoPlayerModal({ isOpen, anime, episodes, onClose }: VideoPlayerModalProps) {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [subtitle, setSubtitle] = useState("korean");
  const [quality, setQuality] = useState("1080p");

  useEffect(() => {
    if (episodes.length > 0) {
      setCurrentEpisode(episodes[0]);
    }
  }, [episodes]);

  const handleEpisodeChange = (episode: Episode) => {
    setCurrentEpisode(episode);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  if (!anime) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0 bg-black border-none" data-testid="video-player-modal">
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-white text-2xl hover:text-accent-coral transition-colors duration-200 z-10"
          data-testid="button-close-player"
        >
          <X className="h-6 w-6" />
        </Button>
        
        {/* Video Player Container */}
        <div className="bg-black rounded-lg overflow-hidden">
          <div className="relative aspect-video">
            {/* Mock video player interface */}
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {isPlaying ? "▶️" : "⏸️"}
                </div>
                <p className="text-white text-lg" data-testid="text-video-title">
                  {anime.title} - {currentEpisode?.title || "1화"}
                </p>
                <p className="text-muted-foreground text-sm">
                  실제 구현 시 비디오 플레이어가 여기 표시됩니다
                </p>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={togglePlay}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-accent-cyan transition-colors duration-200"
                    data-testid="button-play-pause"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-accent-cyan transition-colors duration-200"
                    data-testid="button-skip-back"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-accent-cyan transition-colors duration-200"
                    data-testid="button-skip-forward"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={toggleMute}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-accent-cyan transition-colors duration-200"
                    data-testid="button-mute"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <span className="text-white text-sm" data-testid="text-time">
                    {Math.floor(progress / 60)}:{String(progress % 60).padStart(2, '0')} / {currentEpisode?.duration || "24:00"}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Select value={subtitle} onValueChange={setSubtitle}>
                    <SelectTrigger className="w-32 bg-secondary border-gray-600 text-white text-sm" data-testid="select-subtitle">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="korean">한국어 자막</SelectItem>
                      <SelectItem value="english">영어 자막</SelectItem>
                      <SelectItem value="none">자막 없음</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger className="w-24 bg-secondary border-gray-600 text-white text-sm" data-testid="select-quality">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1080p">1080p</SelectItem>
                      <SelectItem value="720p">720p</SelectItem>
                      <SelectItem value="480p">480p</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-accent-cyan transition-colors duration-200"
                    data-testid="button-fullscreen"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <input
                type="range"
                min="0"
                max="1440"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                data-testid="input-progress"
              />
            </div>
            
            {/* Subtitle Display */}
            {subtitle !== "none" && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <div className="bg-black bg-opacity-70 rounded px-4 py-2">
                  <p className="text-white text-lg font-medium text-center" data-testid="text-subtitle">
                    여기에 자막이 표시됩니다
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Episode List */}
        <div className="mt-4 bg-secondary rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3" data-testid="text-episode-list-title">
            에피소드 목록
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
            {episodes.map((episode) => (
              <Button
                key={episode.id}
                onClick={() => handleEpisodeChange(episode)}
                className={`text-sm font-medium ${
                  currentEpisode?.id === episode.id
                    ? "bg-accent-cyan text-primary"
                    : "bg-primary text-white hover:bg-accent-cyan hover:text-primary"
                } transition-colors duration-200`}
                data-testid={`button-episode-${episode.episodeNumber}`}
              >
                {episode.title}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
