import Song from "../Song";
import styles from "./style.module.css"
import { BsFillBalloonHeartFill, BsPlayCircleFill } from "react-icons/bs";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import { useContext, useEffect } from "react";
import Token from "../../contexts/Token";
import Playlists from "../../contexts/Playlists";
import GoBackButton from "../GoBackButton";
import { useLocation } from "react-router-dom";

function Playlist({ title, songs, setShowSongs, setSongs }) {
  const {songPlayed, setSongPlayed, handleSongsId, setIsSongPlaying} = useContext(HandlePlayingSongContext)
  const {token} = useContext(Token)
  const {currentPlaylistData, setPlayedPlaylist} = useContext(Playlists)
  const location = useLocation().pathname
  const handlePlayPlaylist = (index) => {
    setSongPlayed(songs[index]);
    setIsSongPlaying(true)
    if(location === "/FavoriteArtists"){
      setSongs(songs)
      setPlayedPlaylist(null)
    }
    else{
      setPlayedPlaylist(songs);
    }
    console.log(songPlayed)
  }
    return <>
    (
        <div className={styles.mainDiv}>
          <div className={styles.arrowButton}>
          {location !== "/LikedSongs" && <GoBackButton setShowSongs={setShowSongs} />}
          </div>
      <div className={styles.hedingDiv}>
        <BsPlayCircleFill className={styles.PlayButton} onClick={() => handlePlayPlaylist(0)} size={90} />
        <span>{title}</span>
      </div>
      <div className={styles.songsContainer}>
         {songs && songs?.map((song, i) => (
          <Song handlePlayPlaylist={handlePlayPlaylist} song={song} index={i + 1} key={song._id} />
        ))}
      </div>
    </div>) 
</>
}
export default Playlist;