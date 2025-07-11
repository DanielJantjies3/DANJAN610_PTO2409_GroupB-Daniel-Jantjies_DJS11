import { useEffect, useState } from "react";
import { usePodcastContext } from "../contexts/PodcastContext";

function PodcastModel({ podcast }) {
  const { addToFavorites, removeFavorites, isFavorite, setTrack } =
    usePodcastContext();
  const isFav = isFavorite(podcast.id);
  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(0);

  function onFavClick(e) {
    e.preventDefault();
    if (isFav) {
      removeFavorites(podcast.id);
    } else {
      addToFavorites(podcast);
    }
  }

  const seasons = podcast.seasons || [];
  const selectedSeason = seasons[selectedSeasonIdx] || {};
  const episodes = selectedSeason.episodes || [];

  return (
    <div className="podcastModelContainer flex flex-col md:flex-row gap-8 md:gap-12">
      <div className="flex-1 min-w-[220px] max-w-xs">
        <div className="relative">
          <img
            src={podcast.image}
            alt={podcast.title}
            className="w-full rounded-2xl mb-4 shadow-lg border-2 border-amber-400/40 bg-gradient-to-br from-black via-gray-900 to-gray-800"
          />
          <button
            className={`absolute top-2 right-2 z-10 p-2 rounded-full shadow-md border-2 border-amber-400/40 ${
              isFav ? "text-red-500 bg-white" : "text-amber-100 bg-black/80"
            } transition-colors hover:ring-2 hover:ring-amber-300/60`}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            onClick={onFavClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
        </div>
        <h3 className="text-xl font-bold mt-2 mb-1 text-amber-100">
          {podcast.title}
        </h3>
        <h4 className="text-md text-amber-300 mb-2">
          {seasons.length} {seasons.length === 1 ? "Season" : "Seasons"}
        </h4>
        <p className="text-gray-300 mb-2 text-sm">
          {typeof podcast.description === "string"
            ? podcast.description
            : JSON.stringify(podcast.description)}
        </p>
        <div className="flex flex-wrap gap-2">
          {(podcast.genres || []).map((genre, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
            >
              {typeof genre === "string"
                ? genre
                : genre.title || genre.name || JSON.stringify(genre)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-2 min-w-[260px] w-full">
        <div className="flex flex-wrap gap-2 mb-4">
          {seasons.map((season, idx) => (
            <button
              key={season.season || idx}
              className={`px-4 py-2 rounded border text-sm font-semibold ${
                selectedSeasonIdx === idx
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              onClick={() => setSelectedSeasonIdx(idx)}
            >
              {season.season || idx + 1}
            </button>
          ))}
        </div>

        <div className="episodesList">
          <h5 className="mb-2 text-lg font-bold text-gray-200">
            {selectedSeason.title ||
              `Season ${selectedSeason.season || selectedSeasonIdx + 1}`}
          </h5>
          {episodes.length === 0 ? (
            <div className="text-gray-400">
              No episodes found for this season.
            </div>
          ) : (
            <ul className="space-y-3">
              {episodes.map((ep, i) => (
                <li key={ep.episode || i}>
                  <button
                    onClick={() => {
                      const track = {
                        title: ep.title,
                        description: ep.description,
                        file: ep.file,
                        image: podcast.image,
                        season: selectedSeason.season,
                        episode: ep.episode || i + 1,
                      };
                      setTrack(track);
                    }}
                    className="w-full text-left bg-gray-900 hover:bg-purple-800/80 transition-colors p-3 rounded shadow border border-gray-700"
                  >
                    <strong className="text-purple-300">
                      Ep {ep.episode || i + 1}:
                    </strong>{" "}
                    <span className="text-white">{ep.title}</span>
                    <div className="text-xs text-gray-300 mt-1">
                      {typeof ep.description === "string"
                        ? ep.description
                        : JSON.stringify(ep.description)}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PodcastModel;
