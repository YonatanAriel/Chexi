import styles from "./style.module.css";
import { IoIosAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import NewPlaylistOrArtist from "../../components/popUps/newPlaylistOrArtist";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import axios from "axios";
import User from "../../contexts/User";
import PlaylistCard from "../../components/PlaylistCard";
import Playlist from "../../components/playlist";
import PlaylistsContext from "../../contexts/Playlists";

function Playlists() {
  const {id} = useContext(User)
  const[showPopup, setShowPopup] = useState(false)
  const {songs} = useContext(HandlePlayingSongContext)
  const {playlists, setPlaylists} = useContext(PlaylistsContext)
  useEffect(() => {axios.get(`http://localhost:1000/playlists/user/${id}`)
  .then(res => setPlaylists(res.data))
  .catch(err => console.log(err))}, [showPopup])
  const [showSongs, setShowSongs] = useState(false)
  const [playlistData, setPlaylistData] = useState()

  return <> {showSongs? (<Playlist title={playlistData.name} songs={playlistData.songsId} />)
    :
        ( <>{showPopup && <NewPlaylistOrArtist setShowPopup={setShowPopup} />}
      <div className={styles.PlaylistsContainer}>
        <div>
          <span>New playlist</span>
          <div className={styles.newPlaylistBtn} onClick={() => setShowPopup(prev => !prev)}>
            <IoMdAddCircleOutline size={115} style={{ marginTop: "15px" }} />
          </div>
        </div>
        <div>
          {playlists?.map((playlist, i) => {
            return  <PlaylistCard setShowSongs={setShowSongs} setPlaylistData={setPlaylistData} key={i} playlist={playlist}/>
            })}
        </div>
      </div></>)}
    </>
  
}

export default Playlists;
