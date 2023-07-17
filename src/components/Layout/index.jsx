import Header from "../Header";
import Home from "../../pages/Home";
import Footer from "../popUps/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import LikedSongs from "../../pages/LikedSongs";
import Playlists from "../../pages/Playlists"
import FavoriteArtists from '../../pages/FavoriteArtists'
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import Library from "../popUps/Library";
import VideoContainer from '../../pages/VideoContainer'
import PlaylistsContext from "../../contexts/Playlists";
import ShowPopupsContext from "../../contexts/ShowPopups";
import Token from "../../contexts/Token";
import api from "../../apiCalls/apiCalls"

function Layout() {
  const [isSongPlaying, setIsSongPlaying] = useState()
  const [songPlayed, setSongPlayed] = useState()
  const [userSearch, setUserSearch] = useState("dua lipa")
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
  const [backgroundVideo, setBackgroundVideo] = useState(false)
  const [playlists, setPlaylists] = useState()
  const [currentPlaylistData, setCurrentPlaylistData] = useState()
  const [showCreatePlaylistPopup, setShowCreatePlaylistPopup] = useState(false)
  const [showAddToPlaylistPopup, setShowAddToPlaylistPopup] = useState(false);
  const [renderPlaylistsPage, setRenderPlaylistsPage] = useState(false)
  const [likedSongsPlaylist, setLikedSongsPlaylist] = useState() 
  const [playedPlaylist, setPlayedPlaylist] = useState()
  const [token, setToken] = useState(localStorage.getItem("token"))
  const location = useLocation().pathname
  const options = {
    method: 'GET',
    url: 'https://simple-youtube-search.p.rapidapi.com/search',
    params: {
      query: userSearch,
      safesearch: 'false'
    },
    headers: {
      'X-RapidAPI-Key': '8be7d08215msh45d28e3d9c633e3p109efajsn0dad38837480',
      'X-RapidAPI-Host': 'simple-youtube-search.p.rapidapi.com'
    }
  };
  useEffect( () => {
    async function fetchData() {
      if(token){
          const res = await api.get("playlists/user")
                  console.log(res);
                  setPlaylists(res)
          return 
      }
    }
    fetchData()
    //     axios.get(`http://localhost:1000/playlists/user`, {headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    //   })
    //   .then(res =>{
    //     setPlaylists(res.data)
    //     console.log(res.data);
    //     })
    //     .catch(err => console.log(err))
  
  }, [renderPlaylistsPage, token])

    useEffect(() => {
      if(currentPlaylistData){
      const updatedCurrentPlaylistData = playlists?.find((playlist) => playlist._id === currentPlaylistData?._id);
      setCurrentPlaylistData(updatedCurrentPlaylistData) //to render Playlist component when the user add new song
      }
    },[playlists])

//,showCreatePlaylistPopup, showAddToPlaylistPopup


//   const options2 = {
//   method: 'GET',
//   url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
//   params: {q: userSearch},
//   headers: {
//     'X-RapidAPI-Key': '8be7d08215msh45d28e3d9c633e3p109efajsn0dad38837480',
//     'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
//   }
// };
const [songs, setSongs] = useState([]);
useEffect(() => {
  axios
    .request(options)
    .then((res) => {
      // setSongs(res.data.results);
      handleSongsId(res.data.results)
      console.log(res.data.results,"222");
    })
    .catch((err) => console.log(err));
}, [userSearch]);

const handleSongsId = (songs, playPlaylist) => {
  const songsWithId = songs?.map((song, i) => {
    return {...song, index: i}});
    if(playPlaylist){
      return songsWithId? songsWithId : []
    }
    console.log("localS");
    localStorage.setItem("searchSongs",JSON.stringify(songsWithId))
    setSongs(songsWithId);
}
useEffect(() => console.log(songPlayed),[songPlayed])

const skipBackOrForward = (backOrForward, songsList) => {
console.log(songsList);
  if(songsList && songsList.length > 0){
    let newSong;
    let newIndex;
    if(backOrForward === "forward"){
      if(songPlayed.index === songsList.length - 1){
        newIndex = 0;
      }
      else{
        newIndex  = songPlayed.index + 1;
      }
    }
    else if(backOrForward === "back"){
      if(songPlayed.index === 0){
        newIndex = songsList.length - 1;
      }
      else{
        newIndex = songPlayed.index - 1;
      }
    }
    newSong = songsList.find((song) => song.index === newIndex);
    setSongPlayed(newSong);
  }
  // if(songs && songs.length > 0){
  //   let newSong;
  //   let newIndex;
  //   if(backOrForward === "forward"){
  //     if(songPlayed.index === songs.length - 1){
  //       newIndex = 0;
  //     }
  //     else{
  //       newIndex  = songPlayed.index + 1;
  //     }
  //   }
  //   else if(backOrForward === "back"){
  //     if(songPlayed.index === 0){
  //       newIndex = songs.length - 1;
  //     }
  //     else{
  //       newIndex = songPlayed.index - 1;
  //     }
  //   }
  //   newSong = songs.find((song) => song.index === newIndex);
  //   setSongPlayed(newSong);
  // }

 }


  return (
    <>
    <div className={styles.appContainer}>
      <Token.Provider value={{token, setToken}}>
      <PlaylistsContext.Provider value={{playlists, setPlaylists, setRenderPlaylistsPage, currentPlaylistData, setCurrentPlaylistData, likedSongsPlaylist, setLikedSongsPlaylist, playedPlaylist, setPlayedPlaylist}}>
      {!["/Login", "/SignUp"].includes(location) && <Header backgroundVideo={backgroundVideo} isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} setUserSearch={setUserSearch}/>}
      <HandlePlayingSongContext.Provider value={{songs, setSongs, songPlayed,setSongPlayed, isSongPlaying, setIsSongPlaying, handleSongsId}}>
        <ShowPopupsContext.Provider value={{showCreatePlaylistPopup, setShowCreatePlaylistPopup, showAddToPlaylistPopup, setShowAddToPlaylistPopup}}>
      <Routes>
        {/*setIsSongPlaying={setIsSongPlaying}*/} 
      <Route index element={<Home  backgroundVideo={backgroundVideo} isLibraryOpen={isLibraryOpen} setUserSearch={setUserSearch}/>} /> 
        {token && ( <>
          <Route path="/LikedSongs" element={<LikedSongs />} />
          <Route path="/Playlists"  element={<Playlists />} />
          <Route path="/FavoriteArtists" element={<FavoriteArtists setSongs={setSongs}/>} />
            </>)}
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Video" element={<VideoContainer />}/>
      </Routes>
      {/* isSongPlaying={isSongPlaying} setIsSongPlaying={setIsSongPlaying} */}
      {songPlayed && <Footer  backgroundVideo={backgroundVideo} setBackgroundVideo={setBackgroundVideo} skipBackOrForward={skipBackOrForward}/>}
      </ShowPopupsContext.Provider>
      {!["/Login", "/SignUp"].includes(location) && (["/LikedSongs", "/Playlists","/FavoriteArtists"].includes(location) || isLibraryOpen) && <Library  backgroundVideo={backgroundVideo}/>}
      </HandlePlayingSongContext.Provider>
      </PlaylistsContext.Provider>
      </Token.Provider>
      </div>
    </>
  );
}

export default Layout;
