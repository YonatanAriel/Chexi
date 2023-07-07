import { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import { HiPlus } from "react-icons/hi";
import axios from "axios";
// import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import ShowPopups from "../../contexts/ShowPopups";
import Playlists from "../../contexts/Playlists";
import Token from "../../contexts/Token";

function CreatePlaylist({ placeHolder, addSong, songPlayedData }) {
  const {
    showCreatePlaylistPopup,
    setShowCreatePlaylistPopup,
    setShowAddToPlaylistPopup,
  } = useContext(ShowPopups);
  const [playlistId, setPlaylistId] = useState("");
  const [inputValue, setInputValue] = useState();
  const { setRenderPlaylistsPage } = useContext(Playlists);
  const {token} = useContext(Token)
  // const [playlistId, setPlaylistId] = useState();
  // const {songPlayed} = useContext(HandlePlayingSongContext)
  // const songPlayedData = {title: songPlayed?.title, videoId: songPlayed?.id, songImg: songPlayed?.thumbnail.url,
  //   channelName: songPlayed?.channel.name, channelImg: songPlayed?.channel.icon,
  //    duration: songPlayed?.duration ,duration_formatted: songPlayed?.duration_formatted}

  useEffect(() => {
    if(token){
      if (playlistId && addSong) {
        setShowAddToPlaylistPopup(false);
        if (token) {
          axios
            .post(
              `http://localhost:1000/playlists/addsong/${playlistId}`,
              songPlayedData,
              {headers: {
                Authorization: `Bearer ${token}`
              }
              }          )
            .then((res) => {
              console.log(res.data);
              setRenderPlaylistsPage((prev) => !prev);
            })
            .catch((err) => console.log(err));
        }
      }
    }
  }, [playlistId]);

  const handleButtonClick = async () => {
    // if(inputValue.trim().length === 0 )
    if(token){
        !addSong && inputValue && setShowCreatePlaylistPopup(false);
        await axios
          .post("http://localhost:1000/playlists/addplaylist", {
            name: inputValue,
            // userId: id,
            isFavorite: false,
          },            {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
          )
          .then((res) => {
            setPlaylistId(res.data._id);
            setRenderPlaylistsPage((prev) => !prev);
            console.log(res.data);
          })
          .catch((err) => console.log(err));
    }
  };

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
