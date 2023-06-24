import styles from "./style.module.css";
import { IoIosAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import NewPlaylistOrArtist from "../../components/popUps/newPlaylistOrArtist";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
// import axios from "axios";
import PlaylistCard from "../../components/PlaylistCard";
import Playlist from "../../components/playlist";
import PlaylistsContext from "../../contexts/Playlists";
import ShowPopups from "../../contexts/ShowPopups";

function Playlists() {
  const {showCreatePlaylistPopup, setShowCreatePlaylistPopup} = useContext(ShowPopups)
  const {songs} = useContext(HandlePlayingSongContext)
  const {playlists, setPlaylists, renderPlaylistsPage, setRenderPlaylistsPage, currentPlaylistData, setCurrentPlaylistData} = useContext(PlaylistsContext)

  // useEffect(() => {axios.get(`http://localhost:1000/playlists/user/${id}`)
  // .then(res => setPlaylists(res.data))
  // .catch(err => console.log(err))}, [showCreatePlaylistPopup])

  const [showSongs, setShowSongs] = useState(false)
  // const [currentPlaylistData, setCurrentPlaylistData] = useState()

  // useEffect(() => {
  //   console.log(currentPlaylistData)
  // },[playlists])
  
  // updatedcurrentPlaylistData = playlists.find((playlist) => )
  // setCurrentPlaylistData
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
          {playlists?.map((playlist, i) => {
            return  <PlaylistCard setShowSongs={setShowSongs} key={i} playlist={playlist}/>
            })}
        </div>
      </div></>)}
    </>
  
}

export default Playlists;
