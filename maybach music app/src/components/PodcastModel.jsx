
import React, { useEffect, useState } from "react";
import { fetchAllPodcastsByGenre } from "../services/api";
import { usePodcastContext } from "../contexts/PodcastContext";


function PodcastModel({ podcast }) {
  const { isFavorite, addToFavorites, removeFavorites } = usePodcastContext();
  const isFav = isFavorite(podcast.id);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      
      const allTitles = podcast.genres.map(async (genreId) => {
        const data = await fetchAllPodcastsByGenre(genreId);
        return data.title;
      });
      const resolvedTitles = await Promise.all(allTitles);
      setGenres(resolvedTitles);
    }
    fetchGenres();
  }, [podcast.genres]);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (isFav) {
      removeFavorites(podcast.id);
    } else {
      addToFavorites(podcast);
    }
  }

  return (
    <div className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-video">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-full h-full object-cover"
        />

        <button
          onClick={onFavoriteClick}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full shadow-md ${isFav ? "text-red-500 bg-white" : "text-white bg-gray-900/70"} transition-colors`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
    
        <div className="absolute inset-0 bg-green bg-opacity-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-white truncate max-w-[70%]">
            {podcast.title}
          </h3>
          <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
            {(podcast.seasons ? podcast.seasons.length : 0)} {(podcast.seasons && podcast.seasons.length === 1 ? "Season" : "Seasons")}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {genres.map((genre, index) => (
            <span
              key={index}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="mt-3 relative">
          <p className="text-sm text-gray-400 line-clamp-2 group-hover:line-clamp-none transition-all">
            {podcast.description}
          </p>
          <div className="absolute bottom-0 right-0 h-6 w-10 bg-gradient-to-l from-gray-800 to-transparent group-hover:hidden"></div>
        </div>
      </div>
    </div>
  );
}

export default PodcastModel;
