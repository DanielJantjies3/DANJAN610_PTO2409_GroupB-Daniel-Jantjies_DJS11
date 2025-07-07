import { usePodcastContext } from "../contexts/PodcastContext";
import { useState, useEffect } from "react";
import fuzzysearch from "fuzzysearch";
import PodcastTile from "../components/PodcastTile";

function Favorites() {

    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const {favorites} = usePodcastContext ();

      const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery("Successfully searched for: " + searchQuery);
  };


    if (favorites)   return (
    <div className="home">
      <form onSubmit={handleSearch} className="searchForm">
        <input
          type="text"
          placeholder="Search Podcasts..."
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
        

    return (
        <div>
            <h1>Your Favorites Page</h1>
            <p>Here you can view your favorite podcasts</p>
        </div>
    )
}

export default Favorites;