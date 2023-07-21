import styles from "./style.module.css";
import Playlist from "../../components/playlist";
import { useContext, useEffect, useState } from "react";
import Playlists from "../../contexts/Playlists";
import axios from "axios";
import Token from "../../contexts/Token";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import api from "../../apiCalls/apiCalls"

function LikedSongs() {
  const {playlists, likedSongsPlaylist, setLikedSongsPlaylist} = useContext(Playlists)
  const [likedSongs, setLikedSongs] = useState([])
  const {token} = useContext(Token)
  const {handleSongsId} = useContext(HandlePlayingSongContext)
  useEffect(() => {
    async function getLikesSongsPlaylist(){
     const res = await api.get("playlists/likedsongs")
     setLikedSongsPlaylist(res)
     setLikedSongs(handleSongsId(res?.songsId, true));
    }
    getLikesSongsPlaylist()

        // axios.get("http://localhost:1000/playlists/likedsongs", 
        // {headers: {
        //   Authorization: `Bearer ${token}`
        // }
        // })
        // .then((res) => {
        //   console.log(res.data.songsId);
        //   setLikedSongs(handleSongsId(res.data.songsId, true));
        // })
    },[])
  useEffect(() => {
      setLikedSongs(handleSongsId(likedSongsPlaylist?.songsId, true))
     }
  ,[likedSongsPlaylist])
  return (
    <>
      <Playlist
      songs={likedSongs}
        title={"My favorit songs"}
      />
    </>
  );
}

export default LikedSongs;
