import styles from "./style.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { WaveSpinner } from "react-spinners-kit";
import { MdDelete } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import { useContext, useEffect } from "react";
import Playlists from "../../contexts/Playlists";
import { useLocation } from "react-router-dom";
import api from "../../apiCalls/apiCalls";
// handleDeleteFromPlaylist
function Song({ song, index, handlePlayPlaylist, handleDeleteFromPlaylist, songs}) {
  const { isSongPlaying, setIsSongPlaying, songPlayed, setSongPlayed } = useContext(
    HandlePlayingSongContext
  );
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
  //(location === "/FavoriteArtists")? "id" :
  const id = {
    firstId: playedPlaylist ? "videoId" : "id",
    secondId: location === "/FavoriteArtists" ? "id" : "videoId",
  };
  const condition =
    (songPlayed && songPlayed[id.firstId]) === song[id.secondId];

  const deleteSongFromPlaylist = () => {
    const isCurrentPlaylistPlaying = handleDeleteFromPlaylist(condition, song)
    
    // console.log(isCurrentPlaylistPlaying);
    // if(isCurrentPlaylistPlaying)
    if(playedPlaylist == songs){

      const g = setPlayedPlaylist((prev) => prev.filter((prevSong) => prevSong._id !== song._id))
      console.log(g);
    }

    const playlistToUpdate = location === "/Playlists" ? currentPlaylistData : likedSongsPlaylist;
    
    const updatedPlaylist = {
      ...playlistToUpdate,
      songsId: playlistToUpdate.songsId.filter(
        (playlistSong) => playlistSong._id !== song._id
        ),
      };
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
      <div
        key={index}
        // onClick={() => handlePlayPlaylist(index - 1)}
        className={styles.mainDiv}
        // style={{ cursor: !condition && "pointer" }}
      >
        <div className={styles.numberAndButtonsContainer}>
          <div className={styles.songNumber} style={{display: condition && "none"}}>{index}</div>
          <div className={styles.songButtons}>
            {!condition ? (
              <div
                className={styles.playButton}
                onClick={() => handlePlayPlaylist(index - 1)}
              >
                <FaPlay size={23}
                 style={{marginTop:"6px"}} 
                 />
              </div>
            ) : (
              <div className={styles.songNumber}>{index}</div>
            )}
            {/* <FaPause size={23} /> */}
          </div>
        </div>
        {/* songPlayed == song && isSongPlaying */}
        <div className={styles.imgContainer}>
          <img
            src={song?.thumbnail?.url ? song.thumbnail.url : song?.songImg}
            onError={(e) => {
              e.target.src = song?.channelImg;
            }}
            alt={song?.title}
          />
          {condition && isSongPlaying && (
            <div >
              <WaveSpinner size={33} />
            </div>
          )}
        </div>
        <span className={styles.title}>{song?.title}</span>
        {["/Playlists", "/LikedSongs"].includes(location) && (
          <div className={styles.delete} onClick={deleteSongFromPlaylist}>
            <AiTwotoneDelete style={{marginTop:"6px"}} size={20} />
          </div>
        )}
        <span>{song?.duration_formatted}</span>
      </div>
    </>
  );
}

export default Song;
