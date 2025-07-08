import { usePodcastContext } from "../contexts/PodcastContext";
import { useState, useEffect } from "react";
import fuzzysearch from "fuzzysearch";
import PodcastTile from "../components/PodcastTile";

function Favorites() {
  const [searchQuery, setSearchQuery] = useState("");

  const { favorites } = usePodcastContext();

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery("Successfully searched for: " + searchQuery);
  };

  if (Array.isArray(favorites) && favorites.length > 0) {
    return (
      <div className="favorites">
        <form onSubmit={handleSearch} className="searchForm">
          <input
            type="text"
            placeholder="Search podcasts…"
            className="searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="searchButton">
            Search
          </button>
        </form>
        <div className="podcastGrid">
          {favorites
            .filter((currentPodcast) =>
              fuzzysearch(
                searchQuery.toLowerCase(),
                currentPodcast.title.toLowerCase()
              )
            )
            .map((currentPodcast) => (
              <PodcastTile key={currentPodcast.id} podcast={currentPodcast} />
            ))}
        </div>
      </div>
    );
  } else {
    return (<div>No favorites found.</div>);
  }
}

export default Favorites;
