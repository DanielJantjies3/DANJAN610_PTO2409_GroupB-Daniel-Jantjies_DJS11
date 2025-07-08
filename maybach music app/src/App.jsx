import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PodcastTile from "./components/PodcastTile";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import { PodcastProvider } from "./contexts/PodcastContext";
import DisplayPodcast from "./pages/DisplayPodcast";

function App() {
  return (
    <>
      <div className="w-full fixed top-0 left-0 z-50">
        <NavBar />
      </div>
      <PodcastProvider>
        <main className="mainContent pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/podcast/:id" element={<DisplayPodcast />} />
          </Routes>
        </main>
      </PodcastProvider>
    </>
  );
}

export default App;
