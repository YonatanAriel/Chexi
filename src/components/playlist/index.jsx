import styles from "./style.module.css";
import Song from "../Song";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { BsPlayCircleFill } from "react-icons/bs";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import Playlists from "../../contexts/Playlists";
import GoBackButton from "../GoBackButton";
import Loading from "../Loading";

function Playlist({ title, songs, setShowSongs, setSongs }) {
  const { setSongPlayed, setIsSongPlaying } = useContext(
    HandlePlayingSongContext
  );
  const { setPlayedPlaylist } = useContext(Playlists);
  const location = useLocation().pathname;

  const handlePlayPlaylist = (index) => {
    if (songs?.length > 0) {
      setSongPlayed(songs[index]);
      setIsSongPlaying(true);
      if (location === "/FavoriteArtists") {
        setSongs(songs);
        setPlayedPlaylist(null);
      } else {
        setPlayedPlaylist(songs);
      }
    }
  };

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.arrowButton}>
          {location !== "/LikedSongs" && (
            <GoBackButton setShowSongs={setShowSongs} />
          )}
        </div>
        <div className={styles.hedingDiv}>
          <BsPlayCircleFill
            className={styles.PlayButton}
            onClick={() => handlePlayPlaylist(0)}
            size={90}
          />
          <span>{title}</span>
        </div>
        <div className={styles.songsContainer}>
          {songs ? (
            songs?.map((song, i) => (
              <Song
                songs={songs}
                handleDeleteFromPlaylist={handleDeleteFromPlaylist}
                handlePlayPlaylist={handlePlayPlaylist}
                song={song}
                index={i + 1}
                key={song.videoId}
              />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
export default Playlist;
