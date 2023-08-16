import { useContext, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { HiPlus } from "react-icons/hi";
import ShowPopups from "../../contexts/ShowPopups";
import Playlists from "../../contexts/Playlists";
import api from "../../apiCalls/apiCalls"

function CreatePlaylist({ placeHolder, addSong, songPlayedData }) {
  const {
    setShowCreatePlaylistPopup,
    setShowAddToPlaylistPopup,
  } = useContext(ShowPopups);
  const [playlistId, setPlaylistId] = useState("");
  const [inputValue, setInputValue] = useState();
  const { setRenderPlaylistsPage } = useContext(Playlists);
  const inputRef = useRef()
  useEffect(() => inputRef.current.focus(), [])

  useEffect(() => {
    async function addSongToPlaylist (){
      if (playlistId && addSong) {
        setShowAddToPlaylistPopup(false);
        await api.post(`playlists/addsong/${playlistId}`, songPlayedData)
        setRenderPlaylistsPage((prev) => !prev);
      }
    }
    addSongToPlaylist()
  }, [playlistId]);

  const handleButtonClick = async () => {
        !addSong && inputValue && setShowCreatePlaylistPopup(false);
         const res =  await api.post("playlists/addplaylist", {name: inputValue, isFavorite: false})
            setPlaylistId(res._id);
            setRenderPlaylistsPage((prev) => !prev);

  };


  return (
    <div className={styles.createPlaylist}>
      <input
      ref={inputRef}
        type="text"
        className={styles.createPlaylistInput}
        placeholder={placeHolder ? placeHolder : " Create a new playlist"}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {if(e.key === 'Enter'){handleButtonClick()}}}
      />
      <button className={styles.addPlaylistButton} onClick={handleButtonClick}>
        <HiPlus size={25} />
      </button>
    </div>
  );
}

export default CreatePlaylist;
