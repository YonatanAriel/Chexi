import styles from "./style.module.css";
import Playlist from "../../components/playlist";

function LikedSongs({ songs, songPlayed }) {
  return (
    <>
      <Playlist
        songs={songs}
        songPlayed={songPlayed}
        title={"My favorit songs"}
      />
    </>
  );
}

export default LikedSongs;
