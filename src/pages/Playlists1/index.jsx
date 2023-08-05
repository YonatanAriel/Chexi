import styles from "./style.module.css";
import { useContext, useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import NewPlaylistOrArtist from "../../components/popUps/newPlaylistOrArtist";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import PlaylistCard from "../../components/PlaylistCard";
import Playlist from "../../components/playlist";
import PlaylistsContext from "../../contexts/Playlists";
import ShowPopups from "../../contexts/ShowPopups";
import Loading from "../../components/Loading";


function Playlists() {
  const {handleSongsId} = useContext(HandlePlayingSongContext)
  const {showCreatePlaylistPopup, setShowCreatePlaylistPopup} = useContext(ShowPopups)
  const { playlists, setRenderPlaylistsPage, currentPlaylistData } = useContext(PlaylistsContext)
  const [showSongs, setShowSongs] = useState(false)
  const [filteredPlaylists, setFilteredPlaylists] = useState()

  useEffect(() => setRenderPlaylistsPage(prev => !prev), [])

  useEffect(() => {
    setFilteredPlaylists(playlists?.filter((playlist) => playlist.isFavorite === false))
  },[playlists])

  return <> {showSongs? (<Playlist title={currentPlaylistData.name} setShowSongs={setShowSongs} songs={handleSongsId(currentPlaylistData.songsId, true)} />)
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
          {filteredPlaylists? filteredPlaylists?.map((playlist, i) => {
            return  <PlaylistCard setShowSongs={setShowSongs} key={i} playlist={playlist}/>
            }) :
            <Loading />}
        </div>
      </div></>)}
    </>
  
}

export default Playlists;
