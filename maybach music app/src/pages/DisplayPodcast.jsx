import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPodcastById } from '../services/api';
import PodcastModel from '../components/PodcastModel';

const DisplayPodcast = () => {
const [podcast, setPodcast] = useState("");
const {id} = useParams();


useEffect(()=>{
    async function loadPodcastFromApi(){
        const podcastData = await fetchPodcastById(id);
        setPodcast(podcastData);
    }

    loadPodcastFromApi();
}, [id]); 


  return (
    <div>
        <h1>Podcast Title</h1>
      
            <PodcastModel key={podcast.id} podcast={podcast} />
 
    </div>
  )
}

export default DisplayPodcast