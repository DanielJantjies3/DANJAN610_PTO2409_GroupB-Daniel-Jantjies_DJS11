import PodcastTile from "../components/PodcastTile";
import { useState,useEffect } from "react";
import fuzzysearch from "fuzzysearch";
import { fetchAllPodcasts } from "../services/api";
import { fetchAllPodcastsByGenre } from "../services/api";
import { fetchPodcastById } from "../services/api";


function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    async function loadPodcasts() {
        const allPodcasts = await fetchAllPodcasts()
        setPodcasts (allPodcasts)
    } 

    loadPodcasts();

  },[]) ;



  const handleSearch = (e) => {
    e.preventDefault()
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
      <div className="podcastGrid">
        {podcasts.filter((currentPodcast) => fuzzysearch(searchQuery.toLowerCase(), currentPodcast.title.toLowerCase()))
        
        .map((currentPodcast) => 
            
        (
          <PodcastTile key={currentPodcast.id} podcast={currentPodcast} />
        ))}
      </div>
    </div>
  );
}

export default Home;
