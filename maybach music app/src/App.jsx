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

function App() {
  return (
    <>
    <PodcastProvider>
      <NavBar />

      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </PodcastProvider>
    </>
  );
}

export default App;
