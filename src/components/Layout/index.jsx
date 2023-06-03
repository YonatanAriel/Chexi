import Header from "../Header";
import SongsContainer from "../../pages/SongsContainer";
import Footer from "../Footer";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import LikedSongs from "../../pages/LikedSongs";
import PlayLists from "../../pages/PlayLists";
import FavoriteArtists from '../../pages/FavoriteArtists'
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import HandlePlayingSongContext from "../../contexts";
import Library from "../Library";
import VideoContainer from '../../pages/VideoContainer'

function Layout() {
  const [isSongPlaying, setIsSongPlaying] = useState()
  const [songPlayed, setSongPlayed] = useState()
  const [userSearch, setUserSearch] = useState("dua lipa")
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
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

const handleSongsId = (songs) => {
  const songsWithId = songs.map((song, i) => {
   return {...song, index: i}});
  setSongs(songsWithId);
}

const skipBackOrForward = (backOrForward) => {
  if(songs && songs.length > 0){
    let newSong;
    let newIndex;
    if(backOrForward === "forward"){
      if(songPlayed.index === songs.length - 1){
        newIndex = 0;
      }
      else{
        newIndex  = songPlayed.index + 1;
      }
    }
    else if(backOrForward === "back"){
      if(songPlayed.index === 0){
        newIndex = songs.length - 1;
      }
      else{
        newIndex = songPlayed.index - 1;
      }
    }
    newSong = songs.find((song) => song.index === newIndex);
    setSongPlayed(newSong);
  }
 }

  return (
    <>
    <div className={styles.appContainer}>
      <Header isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} setUserSearch={setUserSearch}/>
      <HandlePlayingSongContext.Provider value={{isSongPlaying, setIsSongPlaying}}>
      <Routes>
        {/*setIsSongPlaying={setIsSongPlaying}*/} 
      <Route index element={<SongsContainer isLibraryOpen={isLibraryOpen} setSongPlayed={setSongPlayed}  setUserSearch={setUserSearch} songs={songs} />} /> 
        <Route path="/LikedSongs" element={<LikedSongs />} />
        <Route path="/PlayLists" element={<PlayLists />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/FavoriteArtists" element={<FavoriteArtists/>} />
        <Route path="/Video" element={<VideoContainer />}/>
      </Routes>
      {/* isSongPlaying={isSongPlaying} setIsSongPlaying={setIsSongPlaying} */}
      {songPlayed && <Footer songPlayed={songPlayed} skipBackOrForward={skipBackOrForward}/>}
      {isLibraryOpen && <Library />}
      </HandlePlayingSongContext.Provider>
      </div>
    </>
  );
}

export default Layout;
