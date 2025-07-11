
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

  const safeTitle =
    typeof podcast.title === "string"
      ? podcast.title
      : podcast.title && podcast.title.rendered
      ? podcast.title.rendered
      : "Untitled";
  const safeImage = typeof podcast.image === "string" ? podcast.image : "";
  const safeDescription =
    typeof podcast.description === "string" ? podcast.description : "";
  const safeSeasons =
    typeof podcast.seasons === "number" || typeof podcast.seasons === "string"
      ? podcast.seasons
      : "";

  return (
    <Link
      to={`/podcast/${podcast.id}`}
      className="group relative bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] transition-all duration-300 transform hover:scale-[1.03] hover:z-20 w-full backdrop-blur-[2px]"
    >
      <div className="relative aspect-[2/3] bg-gradient-to-t from-gray-900 via-black to-gray-800">
        <img
          src={safeImage}
          alt={safeTitle}
          className="w-full h-full object-cover group-hover:brightness-110 transition duration-300 rounded-t-2xl shadow-inner shadow-black/60"
        />
        <button
          onClick={onFavoriteClick}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-lg border-2 border-amber-400/40 ${
            isFav ? "text-red-500 bg-white/90" : "text-amber-100 bg-black/80"
          } transition-colors hover:scale-110 hover:ring-2 hover:ring-amber-300/60`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill={isFav ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/95 via-gray-900/90 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 p-4 pointer-events-none">
          <p className="text-xs text-amber-100 text-center max-h-full overflow-y-auto select-none font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
            {safeDescription && safeDescription.length > 200
              ? safeDescription.slice(0, 200) + "..."
              : safeDescription}
          </p>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-t from-black/80 via-gray-900/80 to-gray-800/90 rounded-b-2xl">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base font-extrabold text-amber-100 truncate flex-1 tracking-wide drop-shadow-[0_1px_2px_rgba(80,0,120,0.3)]">
            {safeTitle}
          </h3>
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-yellow-100 text-black text-[0.7rem] font-black px-2 py-0.5 rounded shadow-md border border-amber-400/40">
            {safeSeasons} {safeSeasons === 1 ? "Season" : "Seasons"}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {genres.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="text-[0.65rem] bg-gradient-to-r from-amber-900 via-gray-800 to-amber-800 text-amber-100 px-2 py-0.5 rounded-full font-semibold shadow-sm border border-amber-400/30 tracking-wide"
            >
              {typeof genre === "string" ? genre : JSON.stringify(genre)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default PodcastTile;
