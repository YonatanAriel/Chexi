import styles from "./style.module.css";
import PlaylistSong from "../PlaylistSong";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BsPlayCircleFill } from "react-icons/bs";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import Playlists from "../../contexts/Playlists";
import GoBackButton from "../GoBackButton";
import Loading from "../Loading";

function Playlist({
  title,
  songs,
  setShowSongs,
  setSongs,
  libraryWidth,
  screenWidth,
}) {
  const { setSongPlayed, setIsSongPlaying } = useContext(
    HandlePlayingSongContext
  );
  const { setPlayedPlaylist } = useContext(Playlists);
  const location = useLocation().pathname;
  const containerWidth =
    libraryWidth == 0 || screenWidth < 900
      ? "100vw"
      : `calc(100vw - ${libraryWidth})`;

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
      <div
        className={styles.mainDiv}
        style={{
          left: screenWidth < 900 ? 0 : libraryWidth,
          width: containerWidth,
        }}
      >
        <div className={styles.arrowButton}>
          {location !== "/LikedSongs" && (
            <GoBackButton setShowSongs={setShowSongs} />
          )}
        </div>
        <div className={styles.headingDiv}>
          <BsPlayCircleFill
            className={styles.PlayButton}
            onClick={() => handlePlayPlaylist(0)}
            size={90}
          />
          <span className={styles.playlistTitle}>{title}</span>
        </div>
        <div className={styles.songsContainer}>
          {songs ? (
            songs?.map((song, i) => (
              <PlaylistSong
                songs={songs}
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
