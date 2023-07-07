import styles from "./style.module.css";
import Playlist from "../../components/playlist";
import { useContext, useEffect, useState } from "react";
import Playlists from "../../contexts/Playlists";
import axios from "axios";
import User from "../../contexts/User";
import Token from "../../contexts/Token";

function LikedSongs() {
  const {playlists, likedSongsPlaylist, setLikedSongsPlaylist} = useContext(Playlists)
  const [songs, setSongs] = useState()
  const {token} = useContext(Token)
  //  console.log(playlists?.find(playlist => playlist.isFavorite === true).songsId)
  useEffect(() => {
    // axios.post("http://localhost:1000/playlists/likedsongs", {userId: id})
      if(token){
        axios.get("http://localhost:1000/playlists/likedsongs", 
        {headers: {
          Authorization: `Bearer ${token}`
        }
        })
        .then((res) => {
          console.log(res.data.songsId);
          setSongs(res.data.songsId);
        })
    }
  },[])
  useEffect(() => {
    setSongs(likedSongsPlaylist?.songsId)
  },[likedSongsPlaylist])
  return (
    <>
      <Playlist
      songs={songs}
        title={"My favorit songs"}
      />
    </>
  );
}

export default LikedSongs;
