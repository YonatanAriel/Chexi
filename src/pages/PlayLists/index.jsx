import styles from "./style.module.css";
import { IoIosAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import NewPlaylistOrArtist from "../../components/popUps/newPlaylistOrArtist";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import PlaylistCard from "../../components/PlaylistCard";
import Playlist from "../../components/playlist";
import PlaylistsContext from "../../contexts/Playlists";
import ShowPopups from "../../contexts/ShowPopups";

function Playlists() {
  const {showCreatePlaylistPopup, setShowCreatePlaylistPopup} = useContext(ShowPopups)
  const {songs} = useContext(HandlePlayingSongContext)
  const {playlists, setPlaylists, renderPlaylistsPage, setRenderPlaylistsPage, currentPlaylistData, setCurrentPlaylistData} = useContext(PlaylistsContext)
  const [showSongs, setShowSongs] = useState(false)
  const [filteredPlaylists, setFilteredPlaylists] = useState()
  useEffect(() => {
    setFilteredPlaylists(playlists?.filter((playlist) => playlist.isFavorite === false))
  },[playlists])
 useEffect(() => {
 console.log(playlists)},[])


  return <> {showSongs? (<Playlist  title={currentPlaylistData.name} songs={currentPlaylistData.songsId} />)
    :
        ( <>{showCreatePlaylistPopup && <NewPlaylistOrArtist />}
      <div className={styles.PlaylistsContainer}>
        <div>
          <span>New playlist</span>
          <div className={styles.newPlaylistBtn} onClick={() => setShowCreatePlaylistPopup(prev => !prev)}>
            <IoMdAddCircleOutline size={115} style={{ marginTop: "15px" }} />
          </div>
        </div>
        <div>
          {filteredPlaylists?.map((playlist, i) => {
            return  <PlaylistCard setShowSongs={setShowSongs} key={i} playlist={playlist}/>
            })}
        </div>
      </div></>)}
    </>
  
}

export default Playlists;
