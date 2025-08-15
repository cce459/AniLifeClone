import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Anime, type Episode } from "@shared/schema";

export function useVideoPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  const { data: episodes = [] } = useQuery({
    queryKey: ["/api/animes", selectedAnime?.id, "episodes"],
    enabled: !!selectedAnime?.id,
  });

  const openPlayer = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePlayer = () => {
    setIsOpen(false);
    setSelectedAnime(null);
    document.body.style.overflow = 'auto';
  };

  return {
    isOpen,
    anime: selectedAnime,
    episodes: episodes as Episode[],
    openPlayer,
    closePlayer,
  };
}
