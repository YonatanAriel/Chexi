import { useState } from "react"
import styles from "./style.module.css"

function PlaylistCard({ playlist, setShowSongs, setPlaylistData}) {
    function getRandomIndex(arr) {
        return Math.floor(Math.random() * arr.length);
      }
    const randomPlaylistIndex = getRandomIndex(playlist?.songsId)
      
  return ( <>
            <div className={styles.playlist} onClick={() =>{ 
                setShowSongs(true),
                setPlaylistData(playlist)
            }}>
                <img src={playlist?.songsId[randomPlaylistIndex]?.songImg} alt={playlist.name} />
                <span>{playlist.name}</span>
              </div>
          </>
  )
}

export default PlaylistCard
