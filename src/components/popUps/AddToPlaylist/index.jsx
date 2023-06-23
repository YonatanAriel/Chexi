import { useContext, useEffect, useState } from "react";
import CreatePlaylist from "../../CreatePlaylist";
import styles from "./style.module.css";
import User from "../../../contexts/User";
import axios from "axios";
// import Playlists from "../../../contexts/Playlists";

function AddToPlaylist({setShowPlaylistPopAp}) {
  const {id} = useContext(User)
  // const {playlists, setPlaylists} = useContext(Playlists)
  const [playlists, setPlaylists] = useState()
  useEffect(()=> console.log(playlists),[playlists])
  useEffect(() => {axios.get(`http://localhost:1000/playlists/user/${id}`)
  .then(res => setPlaylists(res.data))
  .catch(err => console.log(err))}, [])

  return (
     <div className={styles.popup}>
                  <CreatePlaylist setShowPopup={setShowPlaylistPopAp} addSong={true}/>
        <ul>
           {playlists?.map((playlist, i) => {
            return (
              <li key={i}>
                <img src={playlist?.songsId[0]?.songImg} alt={playlist?.name} />
                <span>{playlist?.name.substring(0, 20)}</span>
              </li>
            );
          })}
        </ul>
      </div>)
}
export default AddToPlaylist;

  /* onKeyDown={(e) => {if(e.key === 'Enter') */

