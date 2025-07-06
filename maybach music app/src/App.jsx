import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PodcastTile from './components/PodcastTile'


function App() {

  return (
    <div>
      <PodcastTile podcast={{
        title: "Podcast Title",
        image:"https://via.placeholder.com/150",
        season: 1,
        hosts: ["Host 1" , "Host 2"],
        description: "This is  description of the podcast.",
        genre: ["Genre 1", "Genre 2"],
      }}>

      </PodcastTile>
    </div>
  )
}

export default App
