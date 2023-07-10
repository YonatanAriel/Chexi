import styles from "./style.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { WaveSpinner } from "react-spinners-kit";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import { useContext, useEffect } from "react";
import Playlists from "../../contexts/Playlists";

function Song({ song, index, handlePlayPlaylist }) {
  const {isSongPlaying,setIsSongPlaying, songPlayed} = useContext(HandlePlayingSongContext);
  const {playedPlaylist} = useContext(Playlists)
  // useEffect(() => console.log(song.videoId, "  " , songPlayed.videoId),[])
  return (
    <>
      <div 
      onClick={() => handlePlayPlaylist(index - 1)}
        className={styles.mainDiv}
        style={{ cursor: (playedPlaylist? songPlayed?.videoId : songPlayed?.id) !== song?.videoId && "pointer" }}>
        <div className={styles.numberAndButtonsContainer}>
          <div>{index}</div>
          <div className={styles.songButtons}>
            {(playedPlaylist? songPlayed?.videoId : songPlayed?.id) !== song.videoId ? <FaPlay size={23} /> : <div>{index}</div>}
            {/* <FaPause size={23} /> */}
          </div>
        </div>
        {/* songPlayed == song && isSongPlaying */}
        <div className={styles.imgContainer}>
          <img
            src={song?.songImg}
            onError={(e) => {
              e.target.src = song?.channelImg;
            }}
            alt={song?.title}
          />
          {((playedPlaylist? songPlayed?.videoId : songPlayed?.id) === song?.videoId && isSongPlaying) && <div><WaveSpinner size={33} /></div>}
        </div>
        <span>{song?.title}</span>
        <span>{song?.duration_formatted}</span>
      </div>
    </>
  );
}

export default Song;
