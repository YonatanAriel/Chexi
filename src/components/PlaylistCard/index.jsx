import styles from "./style.module.css"
import { useContext, useEffect, useState } from "react"
import { BsMusicNote } from "react-icons/bs";
import Playlists from "../../contexts/Playlists";

function PlaylistCard({ playlist, setShowSongs }) {
  const {setCurrentPlaylistData} = useContext(Playlists)
  const [imgIndex, setImgIndex] = useState()
  function getRandomIndex(arr) {
      return Math.floor(Math.random() * arr.length);
    }

  useEffect(() => {
    const randomSongIndex = getRandomIndex(playlist?.songsId)
    setImgIndex(randomSongIndex)
  },[])
      
  return ( <>
            <div className={styles.playlist} onClick={() =>{ 
                setShowSongs(true),
                setCurrentPlaylistData(playlist)
            }}>
              {(playlist?.songsId[imgIndex]?.songImg)?
                <img src={playlist?.songsId[imgIndex]?.songImg} alt={playlist.name} /> :
                <div><BsMusicNote size={92}/><span>Chexi</span></div> }
                <span>{playlist.name}</span>
              </div>
          </>
  )
}

export default PlaylistCard
