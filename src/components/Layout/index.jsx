import Header from "../Header";
import SongsContainer from "../../pages/SongsContainer";
import Footer from "../Footer";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import LikedSongs from "../../pages/LikedSongs";
import PlayLists from "../../pages/PlayLists";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import HandlePlayingSongContext from "../../contexts";

function Layout() {
  const [isSongPlaying, setIsSongPlaying] = useState()
  const [songPlayed, setSongPlayed] = useState()
  useEffect(() => console.log(isSongPlaying),[isSongPlaying])
  const [userSearch, setUserSearch] = useState("dua lipa")
  const options2 = {
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
  const options = {
  method: 'GET',
  url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
  params: {q: userSearch},
  headers: {
    'X-RapidAPI-Key': '8be7d08215msh45d28e3d9c633e3p109efajsn0dad38837480',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
  }
};
const [defaultSongs, setDefaultSongs] = useState([]);
useEffect(() => {
  axios
    .request(options2)
    .then((res) => {
      setDefaultSongs(res.data.results);
      console.log(res.data.results,"222");
       console.log(defaultSongs);
    })
    .catch((err) => console.log(err));
}, [userSearch]);

  return (
    <>
    <div className={styles.appContainer}>
      <HandlePlayingSongContext.Provider>
      <Header setUserSearch={setUserSearch}/>
      <Routes>
      <Route index element={<SongsContainer setSongPlayed={setSongPlayed} setIsSongPlaying={setIsSongPlaying} setUserSearch={setUserSearch} defaultSongs={defaultSongs} />} /> 
        <Route path="/LikedSongs" element={<LikedSongs />} />
        <Route path="/PlayLists" element={<PlayLists />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
      {songPlayed && <Footer isSongPlaying={isSongPlaying} setIsSongPlaying={setIsSongPlaying} songPlayed={songPlayed} />}
      </HandlePlayingSongContext.Provider>
      </div>
    </>
  );
}

export default Layout;
