import { usePodcastContext } from "../contexts/PodcastContext";
import { useState, useEffect } from "react";
import fuzzysearch from "fuzzysearch";
import PodcastTile from "../components/PodcastTile";

function Favorites({ genres }) {
  const [searchQuery, setSearchQuery] = useState("");

  const { favorites } = usePodcastContext();

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery("Successfully searched for: " + searchQuery);
  };

  if (Array.isArray(favorites) && favorites.length > 0) {
    return (
      <div className="favorites w-full px-4 text-amber-200">
        <form
          onSubmit={handleSearch}
          className="searchForm mb-6 flex justify-center"
        >
          <input
            type="text"
            placeholder="Search podcasts…"
            className="searchInput border border-amber-400/40 bg-black/80 text-amber-100 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full max-w-md placeholder:text-amber-200/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="searchButton bg-gradient-to-r from-amber-400 via-yellow-300 to-yellow-100 text-black font-bold px-4 py-2 rounded-r hover:from-yellow-200 hover:to-amber-400 transition-colors border border-amber-300/60"
          >
            Search
          </button>
        </form>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ minHeight: "260px" }}>
            {favorites
              .filter((currentPodcast) =>
                fuzzysearch(
                  searchQuery.toLowerCase(),
                  currentPodcast.title.toLowerCase()
                )
              )
              .map((currentPodcast) => (
                <div key={currentPodcast.id} className="flex-shrink-0 w-56">
                  <PodcastTile podcast={currentPodcast} smallCarousel />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center text-amber-200/70 mt-8">
        No favorites found.
      </div>
    );
  }
}

export default Favorites;
