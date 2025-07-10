import "./App.css";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar.jsx";
import PodcastProvider, { usePodcastContext } from "./contexts/PodcastContext";
import DisplayPodcast from "./pages/DisplayPodcast";
import Player from "./components/Player";
import { fetchAllPodcastsByGenre } from "./services/api.js";

import { useEffect, useState } from "react";

function App() {
  const [allGenres, setAllGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchGenres() {
      setLoading(true);
      const genreIds = Array.from({ length: 9 }, (_, i) => i + 1);

      // Fetch all genres in parallel
      
      const results = await Promise.all(
        genreIds.map(async (genreId) => {
          try {
            const data = await fetchAllPodcastsByGenre(genreId);
            if (data && data.title) {
              return data.title;
            }
          } catch (err) {
            console.error(`Failed to fetch genre ${genreId}:`, err);
            return null;
          }
          return null;
        })
      );
      // Filter out nulls and duplicates
      const genreTitles = Array.from(new Set(results.filter(Boolean)));
      setAllGenres(genreTitles);
      setLoading(false);
    }
    fetchGenres();
  }, []);
  return loading ? (
    <div className="loading text-center text-lg text-gray-500">Loading...</div>
  ) : (
    <PodcastProvider>
      <AppContent genres={allGenres} />
    </PodcastProvider>
  );
}

function AppContent({ genres }) {
  const { track, audioRef } = usePodcastContext();

  return (
    <div className="w-full h-[100dvh] min-h-0 flex flex-col overflow-hidden">
      {/* Fixed NavBar at top */}
      <div className="flex-shrink-0 fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>
      {/* Main content scrolls only between NavBar and Player */}
      <div className="flex-1 pt-16 pb-24 overflow-y-auto min-h-0">
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<Home genres={genres} />} />
            <Route path="/home" element={<Home genres={genres} />} />
            <Route path="/favorites" element={<Favorites genres={genres} />} />
            <Route path="/podcast/:id" element={<DisplayPodcast />} />
          </Routes>
        </main>
      </div>
      {/* Fixed Player at bottom */}
      {track && track.file ? (
        <div className="flex-shrink-0 fixed bottom-0 left-0 w-full z-50 bg-gray-900 border-t border-gray-800 shadow-2xl flex items-center justify-center px-2 py-2">
          <div className="w-full max-w-3xl mx-auto">
            <Player />
            <audio ref={audioRef} src={track.file} preload="auto"></audio>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
