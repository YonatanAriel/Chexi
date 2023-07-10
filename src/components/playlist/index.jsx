import Song from "../Song";
import styles from "./style.module.css"
import { BsFillBalloonHeartFill, BsPlayCircleFill } from "react-icons/bs";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import { useContext, useEffect } from "react";
import Token from "../../contexts/Token";
import Playlists from "../../contexts/Playlists";

function Playlist({ title, songs }) {
  const {songPlayed, setSongPlayed, handleSongsId} = useContext(HandlePlayingSongContext)
  const {token} = useContext(Token)
  const {currentPlaylistData, setPlayedPlaylist} = useContext(Playlists)
  const handlePlayPlaylist = (index) => {
    setPlayedPlaylist(songs);
    setSongPlayed(songs[index]);
    console.log(songs[index]);
  }

    return <>
    (
        <div className={styles.mainDiv}>
      <div className={styles.hedingDiv}>
        <BsPlayCircleFill className={styles.PlayButton} onClick={() => handlePlayPlaylist(0)} size={90} />
        <span>{title}</span>
      </div>
      <div className={styles.songsContainer}>
         {token && songs?.map((song, i) => (
          <Song handlePlayPlaylist={handlePlayPlaylist} song={song} index={i + 1} key={song._id} />
        ))}
      </div>
    </div>) 
</>
}
export default Playlist;