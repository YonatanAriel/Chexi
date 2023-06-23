import Song from "../Song";
import styles from "./style.module.css"
import { BsFillBalloonHeartFill, BsPlayCircleFill } from "react-icons/bs";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import { useContext } from "react";

function Playlist({ title, songs }) {
  const {songPlayed} = useContext(HandlePlayingSongContext)
    return <>
        <div className={styles.mainDiv}>
      <div className={styles.hedingDiv}>
        <BsPlayCircleFill className={styles.PlayButton} size={90} />
        <span>{title}</span>
      </div>
      <div className={styles.songsContainer}>
        {songs?.map((song, i) => (
          <Song song={song} index={i + 1} key={i} />
        ))}
      </div>
    </div>
</>
}
export default Playlist;