import { useContext, useEffect, useState } from "react"
import styles from "./style.module.css"
import Playlists from "../../contexts/Playlists";

function PlaylistCard({ playlist, setShowSongs }) {
  const {setCurrentPlaylistData} = useContext(Playlists)
  
    function getRandomIndex(arr) {
        return Math.floor(Math.random() * arr.length);
      }
    const randomPlaylistIndex = getRandomIndex(playlist?.songsId)
      
  return ( <>
            <div className={styles.playlist} onClick={() =>{ 
                setShowSongs(true),
                setCurrentPlaylistData(playlist)
            }}>
                <img src={playlist?.songsId[randomPlaylistIndex]?.songImg} alt={playlist.name} />
                <span>{playlist.name}</span>
              </div>
          </>
  )
}

export default PlaylistCard
