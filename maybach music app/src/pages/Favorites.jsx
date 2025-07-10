import { usePodcastContext } from "../contexts/PodcastContext";
import { useState, useEffect } from "react";
import fuzzysearch from "fuzzysearch";
import PodcastTile from "../components/PodcastTile";

function Favorites({genres}) {
  const [searchQuery, setSearchQuery] = useState("");

  const { favorites } = usePodcastContext();

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery("Successfully searched for: " + searchQuery);
  };

  if (Array.isArray(favorites) && favorites.length > 0) {
    return (
      <div className="favorites w-full px-4">
        <form onSubmit={handleSearch} className="searchForm mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search podcasts…"
            className="searchInput border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="searchButton bg-purple-600 text-white px-4 py-2 rounded-r hover:bg-purple-700 transition-colors">Search</button>
        </form>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ minHeight: '260px' }}>
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
    return (<div className="text-center text-gray-500 mt-8">No favorites found.</div>);
  }
}

export default Favorites;
