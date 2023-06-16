import Song from "../Song";
import styles from "./style.module.css"
import { BsFillBalloonHeartFill, BsPlayCircleFill } from "react-icons/bs";


function Playlist({ songs, songPlayed, title }) {
    return <>
        <div className={styles.mainDiv}>
      <div className={styles.hedingDiv}>
        {/* <BsFillBalloonHeartFill size={135} /> */}
        {/* <img src={songs[0].channel.icon} alt="" style={{margin:"20px 30px 20px 0", width:"160px", height:"160px", borderRadius:"6px"}}/> */}
        {/* style={{marginLeft:"30px"}} */}
        <BsPlayCircleFill className={styles.PlayButton} size={90} />
        <span>{title}</span>
      </div>
      <div className={styles.songsContainer}>
        {songs.map((song, i) => (
          <Song song={song} index={i + 1} key={i} songPlayed={songPlayed} />
        ))}
      </div>
    </div>
</>
}
export default Playlist;