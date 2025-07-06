import PodcastTile from "../components/PodcastTile";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const podcasts = [
    {
      id: 1,
      title: "Podcast One",
      image: "https://via.placeholder.com/150",
      season: 1,
      description: "This is a description of the first podcast.",
      hosts: ["Host A", "Host B"],
      genres: ["Comedy", "Technology"],
    },
    {
      id: 2,
      title: "Podcast Two",
      image: "https://via.placeholder.com/150",
      season: 2,
      description: "This is a description of the second podcast.",
      hosts: ["Host C", "Host D"],
      genres: ["Business", "Marketing"],
    },

    {
      id: 3,
      title: "Podcast Three",
      image: "https://via.placeholder.com/150",
      season: 2,
      description: "This is a description of the second podcast.",
      hosts: ["Host C", "Host D"],
      genres: ["Business", "Marketing"],
    },
  ];

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
        {podcasts.map((currentPodcast) => 
            currentPodcast.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (
          <PodcastTile key={currentPodcast.id} podcast={currentPodcast} />
        ))}
      </div>
    </div>
  );
}

export default Home;
