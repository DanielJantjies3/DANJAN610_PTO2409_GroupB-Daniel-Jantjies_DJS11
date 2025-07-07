import PodcastTile from "../components/PodcastTile";
import { useState, useEffect } from "react";
import fuzzysearch from "fuzzysearch";
import { fetchAllPodcasts } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPodcasts() {
      try {
        const allPodcasts = await fetchAllPodcasts();
        setPodcasts(allPodcasts);
      } catch (err){
        console.error("Failed to load Podcasts: " , err)
      } finally{
        setLoading(false);
      }
    }

    loadPodcasts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery("Successfully searched for: " + searchQuery);
  };

  return (
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

        {loading ? (
            <div className="loading">Loading...</div>
        ):(<div className="podcastGrid">
        {podcasts
          .filter((currentPodcast) =>
            fuzzysearch(
              searchQuery.toLowerCase(),
              currentPodcast.title.toLowerCase()
            )
          )

          .map((currentPodcast) => (
            <PodcastTile key={currentPodcast.id} podcast={currentPodcast} />
          ))}
      </div>)}

      
    </div>
  );
}

export default Home;
