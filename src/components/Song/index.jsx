import styles from "./style.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { WaveSpinner } from "react-spinners-kit";
import HandlePlayingSongContext from "../../contexts";
import { useContext } from "react";

function Song({ song, index, songPlayed,  }) {
  console.log(songPlayed);
  const {isSongPlaying,setIsSongPlaying} = useContext(HandlePlayingSongContext);

  return (
    <>
      <div
        className={styles.mainDiv}
        style={{ cursor: songPlayed !== song && "pointer" }}
      >
        <div className={styles.numberAndButtonsContainer}>
          <div>{index}</div>
          <div className={styles.songButtons}>
            {songPlayed !== song ? <FaPlay size={23} /> : <div>{index}</div>}
            {/* <FaPause size={23} /> */}
          </div>
        </div>
        {/* songPlayed == song && isSongPlaying */}
        <div className={styles.imgContainer}>
          <img
            src={song.thumbnail.url}
            onError={(e) => {
              e.target.src = song.channel.icon;
            }}
            alt={song.title}
          />
          {(songPlayed == song && isSongPlaying) && <div><WaveSpinner size={33} /></div>}
        </div>
        <span>{song.title}</span>
        <span>{song.duration_formatted}</span>
      </div>
    </>
  );
}

export default Song;
