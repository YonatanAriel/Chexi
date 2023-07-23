import { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import { HiPlus } from "react-icons/hi";
import axios from "axios";
import ShowPopups from "../../contexts/ShowPopups";
import Playlists from "../../contexts/Playlists";
// import Token from "../../contexts/Token";
import api from "../../apiCalls/apiCalls"

function CreatePlaylist({ placeHolder, addSong, songPlayedData }) {
  const {
    showCreatePlaylistPopup,
    setShowCreatePlaylistPopup,
    setShowAddToPlaylistPopup,
  } = useContext(ShowPopups);
  const [playlistId, setPlaylistId] = useState("");
  const [inputValue, setInputValue] = useState();
  const { setRenderPlaylistsPage } = useContext(Playlists);
  // const {token} = useContext(Token)

  useEffect(() => {
    async function addSongToPlaylist (){
      if (playlistId && addSong) {
        setShowAddToPlaylistPopup(false);
        await api.post(`playlists/addsong/${playlistId}`, songPlayedData)
        setRenderPlaylistsPage((prev) => !prev);

          // axios
          //   .post(
          //     `http://localhost:1000/playlists/addsong/${playlistId}`,
          //     songPlayedData,
          //     {headers: {
          //       Authorization: `Bearer ${token}`
          //     }
          //     }          )
          //   .then((res) => {
          //     console.log(res.data);
          //     setRenderPlaylistsPage((prev) => !prev);
          //   })
          //   .catch((err) => console.log(err));
      }
    }
    addSongToPlaylist()
  }, [playlistId]);

  const handleButtonClick = async () => {
        !addSong && inputValue && setShowCreatePlaylistPopup(false);
         const res =  await api.post("playlists/addplaylist", {name: inputValue, isFavorite: false})
            setPlaylistId(res._id);
            setRenderPlaylistsPage((prev) => !prev);


        // await axios
        //   .post("http://localhost:1000/playlists/addplaylist", {
        //     name: inputValue,
        //     isFavorite: false,
        //   },            {
        //     headers: {
        //       Authorization: `Bearer ${token}`
        //     }
        //   }
        //   )
        //   .then((res) => {
        //     setPlaylistId(res.data._id);
        //     setRenderPlaylistsPage((prev) => !prev);
        //     console.log(res.data);
        //   })
        //   .catch((err) => console.log(err));
  };

  return (
    <div className={styles.createPlaylist}>
      <input
        type="text"
        className={styles.createPlaylistInput}
        placeholder={placeHolder ? placeHolder : " Create new playlist"}
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
