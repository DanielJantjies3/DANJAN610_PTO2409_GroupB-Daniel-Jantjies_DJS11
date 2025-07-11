import { createContext, useState, useEffect, useContext, useRef } from "react";

const PodcastContext = createContext();

export const usePodcastContext = () => useContext(PodcastContext);

export const PodcastProvider = ({ children }) => {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const storedCurrent = localStorage.getItem("currentTrack");
    if (storedCurrent) {
      setTrack(JSON.parse(storedCurrent));
    }
  }, []);

  useEffect(() => {
    if (track && track.file && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
      setPlayStatus(true);
    }
  }, [track]);

  const audioRef = useRef(null);
  const seekBg = useRef();
  const seekBar = useRef();
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (podcast) => {
    setFavorites((prev) => [...prev, podcast]);
  };

  const removeFavorites = (podcastId) => {
    setFavorites((prev) => prev.filter((podcast) => podcast.id !== podcastId));
  };

  const isFavorite = (podcastId) => {
    return favorites.some((podcast) => podcast.id === podcastId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFavorites,
    isFavorite,
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
};

export default PodcastProvider;
