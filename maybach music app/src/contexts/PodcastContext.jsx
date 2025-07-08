import { createContext, useState, useEffect, useContext } from "react";

const PodcastContext = createContext();

export const usePodcastContext = () => useContext(PodcastContext);

export const PodcastProvider = ({ children }) => {
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
    setFavorites(prev => prev.filter(podcast => podcast.id !==podcastId))
  }

  const isFavorite = (podcastId) => {
    return favorites.some(podcast => podcast.id === podcastId)
  }

  const value = {
    favorites,
    addToFavorites,
    removeFavorites,
    isFavorite,
  }

  return <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>;
}

export default PodcastProvider


