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
    <div className="home w-full px-4">
      <form onSubmit={handleSearch} className="searchForm mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Podcasts..."
          className="searchInput border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="searchButton bg-purple-600 text-white px-4 py-2 rounded-r hover:bg-purple-700 transition-colors">Search</button>
      </form>

      {loading ? (
        <div className="loading text-center text-lg text-gray-500">Loading...</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <div
            className="flex gap-4 pb-4"
            style={{ minHeight: '220px' }}
          >
            {podcasts
              .filter((currentPodcast) =>
                fuzzysearch(
                  searchQuery.toLowerCase(),
                  currentPodcast.title.toLowerCase()
                )
              )
              .map((currentPodcast) => (
                <div
                  key={currentPodcast.id}
                  className="flex-shrink-0 w-44 sm:w-52 md:w-56 lg:w-64 xl:w-72"
                >
                  <PodcastTile podcast={currentPodcast} smallCarousel />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
