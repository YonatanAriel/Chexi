import styles from "./style.module.css";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { WaveSpinner } from "react-spinners-kit";
import { AiTwotoneDelete } from "react-icons/ai";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import Playlists from "../../contexts/Playlists";
import api from "../../apiCalls/apiCalls";

function PlaylistSong({ song, index, handlePlayPlaylist }) {
  const { isSongPlaying, songPlayed, setSongPlayed, handleSongsId } =
    useContext(HandlePlayingSongContext);
  const {
    setPlaylists,
    playedPlaylist,
    setPlayedPlaylist,
    likedSongsPlaylist,
    currentPlaylistData,
    setLikedSongsPlaylist,
    setCurrentPlaylistData,
  } = useContext(Playlists);
  const location = useLocation().pathname;
  const id = {
    // firstId: playedPlaylist ? "videoId" : "id", old api
    firstId: "videoId",
    // secondId: location === "/FavoriteArtists" ? "id" : "videoId",old api
    secondId: "videoId",
  };
  const condition =
    (songPlayed && songPlayed[id.firstId]) === song[id.secondId];

  const deleteSongFromPlaylist = () => {
    const playlistToUpdate =
      location === "/Playlists" ? currentPlaylistData : likedSongsPlaylist;
    const updatedPlaylist = {
      ...playlistToUpdate,
      songsId: playlistToUpdate.songsId.filter(
        (playlistSong) => playlistSong._id !== song._id
      ),
    };
    if (location === "/Playlists") {
      const newSongs = handleSongsId(updatedPlaylist?.songsId, true);
      const playedPlaylistWithoutIndexes = playedPlaylist?.map(
        ({ index, ...rest }) => rest
      );
      const isCurrentPlaylistPlayed =
        JSON.stringify(playedPlaylistWithoutIndexes) ===
        JSON.stringify(currentPlaylistData?.songsId);
      if (isCurrentPlaylistPlayed && playedPlaylist.length > 0) {
        const playedSongIndex = playedPlaylist?.findIndex(
          (song) => song._id === songPlayed?._id
        );
        const newSongToPlay =
          playedSongIndex === newSongs.length
            ? newSongs[0]
            : newSongs[playedSongIndex];
        setSongPlayed(newSongToPlay);
        setPlayedPlaylist(newSongs);
      }
    }
    playlistToUpdate === currentPlaylistData
      ? (setCurrentPlaylistData(updatedPlaylist),
        setPlaylists((prev) => {
          return prev.map((playlist) => {
            if (playlist._id === updatedPlaylist._id) {
              return updatedPlaylist;
            }
            return playlist;
          });
        }))
      : setLikedSongsPlaylist(updatedPlaylist);

    api.post(`playlists/deletesong/${playlistToUpdate._id}`, { id: song._id });
  };

  return (
    <>
      <div key={index} className={styles.mainDiv}>
        <div className={styles.numberAndButtonsContainer}>
          <div
            className={styles.songNumber}
            style={{ display: condition && "none" }}
          >
            {index}
          </div>
          <div className={styles.songButtons}>
            {!condition ? (
              <div
                className={styles.playButton}
                onClick={() => handlePlayPlaylist(index - 1)}
              >
                <FaPlay size={23} style={{ marginTop: "6px" }} />
              </div>
            ) : (
              <div className={styles.songNumber}>{index}</div>
            )}
          </div>
        </div>
        <div className={styles.imgContainer}>
          <img
            // src={song?.thumbnail?.url ? song.thumbnail.url : song?.songImg} old api
            src={
              song?.thumbnail?.length > 0 && song?.thumbnail[0]?.url
                ? song?.thumbnail[0]?.url
                : song?.songImg
            }
            onError={(e) => {
              // e.target.src = song?.channelImg;old api
              if (playedPlaylist && song?.channelImg) {
                e.target.src = song?.channelImg;
              }
              if (song?.thumbnail[1]?.url) {
                e.target.src = song?.thumbnail[1]?.url;
              }
            }}
            alt={song?.title}
          />
          {condition && isSongPlaying && (
            <div>
              <WaveSpinner size={33} />
            </div>
          )}
        </div>
        <span className={styles.title}>{song?.title}</span>
        {["/Playlists", "/LikedSongs"].includes(location) && (
          <div className={styles.delete} onClick={deleteSongFromPlaylist}>
            <AiTwotoneDelete style={{ marginTop: "6px" }} size={20} />
          </div>
        )}
        {/* <span className={styles.duration}>{song?.duration_formatted}</span> old api*/}
        <span className={styles.duration}>
          {location === "/FavoriteArtists"
            ? song?.lengthText
            : song?.duration_formatted}
        </span>
      </div>
    </>
  );
}

export default PlaylistSong;
