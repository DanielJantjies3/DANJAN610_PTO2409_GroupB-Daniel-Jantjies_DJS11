import React from "react";
import { useEffect, useState } from "react";
import { fetchAllPodcastsByGenre } from "../services/api";
import { usePodcastContext } from "../contexts/PodcastContext";

function PodcastTile({ podcast }) {
  const { isFavorite, addToFavorites, removeFavorites } =
    usePodcastContext();

    const isFav = isFavorite(podcast.id)

  const [genres, setGenres] = useState([]);
  useEffect(() => {
    async function fetchGenres() {
      const allTitles = await podcast.genres.map(async (genreId) => {
        const data = await fetchAllPodcastsByGenre(genreId);
        return data.title;
      });
      const resolvedTitles = await Promise.all(allTitles);
      setGenres(resolvedTitles);
    }
    fetchGenres();
  }, [podcast.genres]);

  function onFavoriteClick(e) {
    e.preventDefault()
    if(isFav) {
        removeFavorites(podcast.id)
    }else { 
      addToFavorites(podcast)
    }
  }

  return (
    <div className="podcastContainer">
      <div className="podcastPoster">
        <img src={podcast.image} alt={podcast.title} />
        <div className="posterOverlay">
          <button className={`fav-btn ${isFav ? "active": ""}`} onClick={onFavoriteClick}>
            🖤
          </button>
        </div>
      </div>
      <div className="podcastInformation">
        <h3 className="podcastTitle">{podcast.title}</h3>
        <h3 className="podcastSeason">
          {podcast.seasons} {podcast.seasons === 1 ? "Season" : "Seasons"}
        </h3>
        <p className="podcastDescription">{podcast.description}</p>
        <p className="podcastGenre">{genres.join(",")}</p>
      </div>
    </div>
  );
}

export default PodcastTile;
