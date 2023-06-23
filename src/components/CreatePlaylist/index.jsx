import { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import { HiPlus } from "react-icons/hi";
import axios from "axios";
import { Await } from "react-router-dom";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import User from "../../contexts/User";

function CreatePlaylist({ placeHolder, setShowPopup, addSong }) {
  const {id} = useContext(User)
  useEffect(() => console.log(id), [id])
  const {songPlayed} = useContext(HandlePlayingSongContext)
  const [playlistId, setPlaylistId] = useState("")
  const [inputValue, setInputValue] = useState();
  // const [playlistId, setPlaylistId] = useState();
  const songData = {title: songPlayed.channel.name, videoId: songPlayed.id, songImg: songPlayed.thumbnail.url,
    channelName: songPlayed.channel.name, channelImg: songPlayed.channel.icon,
     duration: songPlayed.duration ,duration_formatted: songPlayed.duration_formatted}

useEffect(() => {  
  if(playlistId && addSong){
    setShowPopup(false);
  axios.post(`http://localhost:1000/playlists/addsong/${playlistId}`, songData)
   .then((res) => {
    console.log(res);
  })
    .catch(err => console.log(err))
}
},[playlistId])

  const handleButtonClick = async () => {
    // if(inputValue.trim().length === 0 )
   !addSong && inputValue && setShowPopup(false);
    await (axios.post("http://localhost:1000/playlists/addplaylist", { name: inputValue, userId: id })
    .then(res =>{
      setPlaylistId(res.data._id)
    }).catch(err => console.log(err)))
  }

  return (
    <div className={styles.createPlaylist}>
      <input
        type="text"
        className={styles.createPlaylistInput}
        placeholder={placeHolder ? placeHolder : " Create new playlist"}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.addPlaylistButton} onClick={handleButtonClick}>
        <HiPlus size={25} />
      </button>
    </div>
  );
}

export default CreatePlaylist;
