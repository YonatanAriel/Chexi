import { useContext, useEffect, useState } from "react";
import CreatePlaylist from "../../CreatePlaylist";
import styles from "./style.module.css";
import axios from "axios";
import Playlists from "../../../contexts/Playlists";
import HandlePlayingSongContext from "../../../contexts/HandlePlayingSong";
import ShowPopups from "../../../contexts/ShowPopups";
import {IoIosArrowDown} from "react-icons/io"
import Token from "../../../contexts/Token";

function AddToPlaylist() {
  const { playlists, setRenderPlaylistsPage } = useContext(Playlists)
  const {setShowAddToPlaylistPopup} = useContext(ShowPopups)
  const {songPlayed} = useContext(HandlePlayingSongContext)
  const {token} = useContext(Token)
  const songPlayedData = {title: songPlayed?.title, videoId: songPlayed?.id, songImg: songPlayed?.thumbnail.url,
    channelName: songPlayed?.channel.name, channelImg: songPlayed?.channel.icon,
     duration: songPlayed?.duration ,duration_formatted: songPlayed?.duration_formatted}

const addSongToPlaylist = (playlist) => {
  if(token){
    setShowAddToPlaylistPopup(false);
    axios.post(`http://localhost:1000/playlists/addsong/${playlist._id}`, songPlayedData,
    {headers: {
      Authorization: `Bearer ${token}`
    }
    })
    .then((res) => {
    console.log(res);
    setRenderPlaylistsPage(prev => !prev)
    })
    .catch(err => console.log(err))
  }
}
  return (
     <div className={styles.popup}>
      <IoIosArrowDown  size={115} onClick={() => setShowAddToPlaylistPopup(false)}/>
      <span>Add to playlist</span>
                  <CreatePlaylist songPlayedData={songPlayedData} addSong={true}/>
        <ul>
           {playlists?.filter(playlist => playlist.isFavorite === false).map((playlist, i) => {
            return (
              <li key={i} onClick={() => addSongToPlaylist(playlist)}>
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

