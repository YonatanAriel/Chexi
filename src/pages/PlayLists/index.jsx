import styles from "./style.module.css";
import { IoIosAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import NewPlaylistOrArtist from "../../components/popUps/newPlaylistOrArtist";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import PlaylistCard from "../../components/PlaylistCard";
import Playlist from "../../components/playlist";
import PlaylistsContext from "../../contexts/Playlists";
import ShowPopups from "../../contexts/ShowPopups";
import Token from "../../contexts/Token";
import Loading from "../../components/Loading";

function Playlists() {
  const {showCreatePlaylistPopup, setShowCreatePlaylistPopup} = useContext(ShowPopups)
  const {songs, handleSongsId} = useContext(HandlePlayingSongContext)
  const {playlists, setPlaylists, renderPlaylistsPage, setRenderPlaylistsPage, currentPlaylistData, setCurrentPlaylistData} = useContext(PlaylistsContext)
  const [showSongs, setShowSongs] = useState(false)
  const [filteredPlaylists, setFilteredPlaylists] = useState()
  const {token} = useContext(Token)
  useEffect(() => setRenderPlaylistsPage(prev => !prev), [])
    useEffect(() => {
    setFilteredPlaylists(playlists?.filter((playlist) => playlist.isFavorite === false))
  },[playlists])

useEffect(() => console.log(filteredPlaylists),[filteredPlaylists])
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
