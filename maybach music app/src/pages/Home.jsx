import PodcastTile from "../components/PodcastTile";
import { useState, useEffect } from "react";
import fuzzysearch from "fuzzysearch";
import { fetchAllPodcasts, fetchAllPodcastsByGenre } from "../services/api";

function Home({genres}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const allGenres = genres;

  useEffect(() => {
    async function loadPodcasts() {
      try {
        const allPodcasts = await fetchAllPodcasts();
        setPodcasts(allPodcasts);
      } catch (err) {
        console.error("Failed to load Podcasts: ", err);
      } finally {
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

  
  const [sortAZ, setSortAZ] = useState(null); 
  const [genreFilter, setGenreFilter] = useState("");


  
  let filteredPodcasts = podcasts.filter((currentPodcast) =>
    fuzzysearch(searchQuery.toLowerCase(), currentPodcast.title.toLowerCase())
  );
  if (genreFilter) {
    switch (genreFilter) {
      case "Personal Growth":
        filteredPodcasts = filteredPodcasts.filter(
          (currentPodcast) =>
            currentPodcast.genres &&
            Array.isArray(currentPodcast.genres) &&
            currentPodcast.genres.includes(1)
        );
        break;
      case "Investigative Journalism":
        filteredPodcasts = filteredPodcasts.filter(
          (currentPodcast) =>
            currentPodcast.genres &&
            Array.isArray(currentPodcast.genres) &&
            currentPodcast.genres.includes(2)
        );
        break;
      case "History":
        filteredPodcasts = filteredPodcasts.filter(
          (currentPodcast) =>
            currentPodcast.genres &&
            Array.isArray(currentPodcast.genres) &&
            currentPodcast.genres.includes(3)
        );
        break;
      case "Comedy":
        filteredPodcasts = filteredPodcasts.filter(
          (currentPodcast) =>
            currentPodcast.genres &&
            Array.isArray(currentPodcast.genres) &&
            currentPodcast.genres.includes(4)
        );
        break;

      case "Entertainment":
        filteredPodcasts = filteredPodcasts.filter(
          (currentPodcast) =>
            currentPodcast.genres &&
            Array.isArray(currentPodcast.genres) &&
            currentPodcast.genres.includes(5)
        );
        break;
      case "Business":
        filteredPodcasts = filteredPodcasts.filter(
          (currentPodcast) =>
            currentPodcast.genres &&
            Array.isArray(currentPodcast.genres) &&
            currentPodcast.genres.includes(6)
        );
        break;
      case "Fiction":
        filteredPodcasts = filteredPodcasts.filter(
          (currentPodcast) =>
            currentPodcast.genres &&
            Array.isArray(currentPodcast.genres) &&
            currentPodcast.genres.includes(7)
        );
        break;
      case "News":
        filteredPodcasts = filteredPodcasts.filter(
          (currentPodcast) =>
            currentPodcast.genres &&
            Array.isArray(currentPodcast.genres) &&
            currentPodcast.genres.includes(8)
        );
        break;
      case "Kids and Family":
        filteredPodcasts = filteredPodcasts.filter(
          (currentPodcast) =>
            currentPodcast.genres &&
            Array.isArray(currentPodcast.genres) &&
            currentPodcast.genres.includes(9)
        );
        break;
    
    }
  }
  if (sortAZ === "asc") {
    filteredPodcasts = [...filteredPodcasts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sortAZ === "desc") {
    filteredPodcasts = [...filteredPodcasts].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  return (
    <div className="home w-full px-4">
      <form
        onSubmit={handleSearch}
        className="searchForm mb-6 flex justify-center"
      >
        <input
          type="text"
          placeholder="Search Podcasts..."
          className="searchInput border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="searchButton bg-purple-600 text-white px-4 py-2 rounded-r hover:bg-purple-700 transition-colors"
        >
          Search
        </button>
      </form>

      
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-xs text-gray-500">Sort:</span>
        <button
          className={`px-3 py-1 rounded text-xs font-semibold border ${
            sortAZ === "asc"
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          onClick={() => setSortAZ(sortAZ === "asc" ? null : "asc")}
        >
          A-Z
        </button>
        <button
          className={`px-3 py-1 rounded text-xs font-semibold border ${
            sortAZ === "desc"
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          onClick={() => setSortAZ(sortAZ === "desc" ? null : "desc")}
        >
          Z-A
        </button>
      </div>

      
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs text-gray-500">Filter by Genre:</span>
        <button
          className={`px-3 py-1 rounded text-xs font-semibold border ${
            genreFilter === ""
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          onClick={() => setGenreFilter("")}
        >
          All
        </button>
        {allGenres.map((genre) => (
          <button
            key={genre}
            className={`px-3 py-1 rounded text-xs font-semibold border ${
              genreFilter === genre
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-800 border-gray-300"
            }`}
            onClick={() =>{
              setGenreFilter(genre);
              
            } }
          >
            {genre}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading text-center text-lg text-gray-500">
          Loading...
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ minHeight: "220px" }}>
            {filteredPodcasts.map((currentPodcast) => (
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
