import React from 'react'

function PodcastTile ({podcast}) {

    function onFavoriteClick () {
        alert("clicked")
    }

    return  (

    <div className='podcastContainer'>
        <div className='podcastPoster'>
            <img src={podcast.image}  alt={podcast.title}/>
            <div className='posterOverlay'>
                    <button className='favorite-btn' onClick={onFavoriteClick}>🖤</button>
            </div>
        </div>
        <div className='podcastInformation'>
            <h3 className='podcastTitle'>{podcast.title}</h3>
            <h3 className='podcastSeason'>{podcast.season} {podcast.season === 1 ? 'Season' : 'Seasons'}</h3>
            <p className='podcastDescription'>{podcast.description}</p>
            <p className='podcastHosts'>{podcast.hosts.join(",")}</p>
            <p className='podcastGenre'>{podcast.genres.join(",")}</p>


        </div>
    </div>

    )
}
    

export default PodcastTile
