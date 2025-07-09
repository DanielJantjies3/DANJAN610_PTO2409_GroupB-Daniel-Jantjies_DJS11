
import React, { useEffect, useState } from "react";
import { fetchAllPodcastsByGenre } from "../services/api";
import { usePodcastContext } from "../contexts/PodcastContext";
import { Link } from "react-router-dom";

function PodcastTile({ podcast }) {
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

    <Link to= {`/podcast/${podcast.id}`} className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:z-10 w-full">

      <div className="relative aspect-[2/3]">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-full h-full object-cover group-hover:brightness-110 transition duration-300"
        />
 
        <button
          onClick={onFavoriteClick}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-lg ${isFav ? "text-red-500 bg-white/90" : "text-white bg-gray-900/70"} transition-colors hover:scale-110`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill={isFav ? "currentColor" : "none"} 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <div className="absolute inset-0 flex items-center justify-center bg-black/80 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 p-3 pointer-events-none">
          <p className="text-xs text-gray-100 text-center max-h-full overflow-y-auto select-none">
            {podcast.description && podcast.description.length > 200
              ? podcast.description.slice(0, 200) + '...'
              : podcast.description}
          </p>
        </div>
      </div>

      
      <div className="p-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm font-bold text-white truncate flex-1">
            {podcast.title}
          </h3>
          <span className="bg-purple-600/90 text-white text-[0.65rem] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
            {podcast.seasons} {podcast.seasons === 1 ? "Season" : "Seasons"}
          </span>
        </div>
   
        <div className="mt-1.5 flex flex-wrap gap-1">
          {genres.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="text-[0.6rem] bg-gray-700/80 text-gray-300 px-1.5 py-0.5 rounded"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default PodcastTile;
