import Song from "../Song";
import styles from "./style.module.css"
import { BsFillBalloonHeartFill, BsPlayCircleFill } from "react-icons/bs";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import { useContext, useEffect, useMemo } from "react";
import Playlists from "../../contexts/Playlists";
import GoBackButton from "../GoBackButton";
import { useLocation } from "react-router-dom";
import Loading from "../Loading";

function Playlist({ title, songs, setShowSongs, setSongs }) {
  const {songPlayed, setSongPlayed, handleSongsId, setIsSongPlaying} = useContext(HandlePlayingSongContext)
  const {currentPlaylistData, playedPlaylist, setPlayedPlaylist} = useContext(Playlists)
  const location = useLocation().pathname
  
  const handlePlayPlaylist = (index) => {
    if(songs?.length > 0){
      setSongPlayed(songs[index]);
      setIsSongPlaying(true)
      if(location === "/FavoriteArtists"){
        setSongs(songs)
        //** */
        setPlayedPlaylist(null)
      }
      else{
        setPlayedPlaylist(songs);
      }
  }
}
// useEffect(() => {console.log(songs)},[ songs])
// useEffect(() => {console.log(playedPlaylist)},[playedPlaylist])
// useEffect(() => {
//   if(playedPlaylist == songs){
//     setSongs
//   }
// },[songs])

const handleDeleteFromPlaylist = (condition, song) => {
  // if(playedPlaylist && condition) {
  //   const currentSongIndex = songs.findIndex((playlistSong) => playlistSong._id === song._id);
  //   console.log(currentSongIndex);
  //   setSongPlayed()
  // }
      // setPlayedPlaylist((prev) => prev.filter((prevSong) => prevSong._id !== song._id))
}

    return <>
    
        <div className={styles.mainDiv}>
          <div className={styles.arrowButton}>
          {location !== "/LikedSongs" && <GoBackButton setShowSongs={setShowSongs} />}
          </div>
      <div className={styles.hedingDiv}>
        <BsPlayCircleFill className={styles.PlayButton} onClick={() => handlePlayPlaylist(0)} size={90} />
        <span>{title}</span>
      </div>
      <div className={styles.songsContainer}>
         {songs? songs?.map((song, i) => (
          <Song songs={songs}
          handleDeleteFromPlaylist={handleDeleteFromPlaylist} 
          // key={songIds[i]}
          handlePlayPlaylist={handlePlayPlaylist} song={song} index={i + 1} key={song.videoId}  />
        )) :
        <Loading />}
      </div>
    </div>
</>
}
export default Playlist;