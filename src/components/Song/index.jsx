import styles from "./style.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { WaveSpinner } from "react-spinners-kit";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import { useContext, useEffect } from "react";
import Playlists from "../../contexts/Playlists";
import { useLocation } from "react-router-dom";

function Song({ song, index, handlePlayPlaylist }) {
  const {isSongPlaying,setIsSongPlaying, songPlayed} = useContext(HandlePlayingSongContext);
  const {playedPlaylist} = useContext(Playlists)
  const location = useLocation().pathname
  //(location === "/FavoriteArtists")? "id" : 
  const id = {firstId: (playedPlaylist? "videoId" : "id"),
              secondId: (location === "/FavoriteArtists")? "id" : "videoId"}
  const condition  = (songPlayed && songPlayed[id.firstId]) === song[id.secondId]
  return (
    <>
      <div key={index}
      onClick={() => handlePlayPlaylist(index - 1)}
        className={styles.mainDiv}
        style={{ cursor: !condition && "pointer" }}>
        <div className={styles.numberAndButtonsContainer}>
          <div>{index}</div>
          <div className={styles.songButtons}>
            {!condition ? <FaPlay size={23} /> : <div>{index}</div>}
            {/* <FaPause size={23} /> */}
          </div>
        </div>
        {/* songPlayed == song && isSongPlaying */}
        <div className={styles.imgContainer}>
          <img
            src={song?.thumbnail?.url? song.thumbnail.url : song?.songImg}
            onError={(e) => {
              e.target.src = song?.channelImg;
            }}
            alt={song?.title}
          />
          {(condition && isSongPlaying) && <div><WaveSpinner size={33} /></div>}
        </div>
        <span>{song?.title}</span>
        <span>{song?.duration_formatted}</span>
      </div>
    </>
  );
}

export default Song;
