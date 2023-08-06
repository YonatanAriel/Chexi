import styles from "./style.module.css";
import { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { BsMusicNote } from "react-icons/bs";
import { getIconAsSvgDataURL } from '../../utils';
import axios from "axios";
import Token from "../../contexts/Token";
import api from "../../apiCalls/apiCalls";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import PlaylistsContext from "../../contexts/Playlists";
import ShowPopupsContext from "../../contexts/ShowPopups";
import Header from "../Header";
import Footer from "../popUps/Footer";
import Library from "../popUps/Library";
// import Playlists from "../../pages/Playlists"
const Home = lazy(() => import("../../pages/Home"))
const Login = lazy(() => import("../../pages/Login"))
const SignUp = lazy(() => import("../../pages/SignUp"))
const Playlists = lazy(() => import("../../pages/Playlists"))
const LikedSongs = lazy(() => import("../../pages/LikedSongs"))
const VideoContainer = lazy(() => import("../../pages/VideoContainer"))
const FavoriteArtists = lazy(() => import("../../pages/FavoriteArtists"))

function Layout() {
  const [songs, setSongs] = useState([]);
  const [fetchSongsRetryCount, setFetchSongsRetryCount] = useState(0);
  const [isSongPlaying, setIsSongPlaying] = useState()
  const [songPlayed, setSongPlayed] = useState()

  const [playlists, setPlaylists] = useState()
  const [currentPlaylistData, setCurrentPlaylistData] = useState()
  const [renderPlaylistsPage, setRenderPlaylistsPage] = useState(false)
  const [likedSongsPlaylist, setLikedSongsPlaylist] = useState() 
  const [playedPlaylist, setPlayedPlaylist] = useState()
  
  const [showCreatePlaylistPopup, setShowCreatePlaylistPopup] = useState(false)
  const [showAddToPlaylistPopup, setShowAddToPlaylistPopup] = useState(false);
  const [userSearch, setUserSearch] = useState("dua lipa")
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
  const [backgroundVideo, setBackgroundVideo] = useState(false)
  const [token, setToken] = useState(localStorage.getItem("token") === "null" ? null : localStorage.token)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const maxFetchSongsRetryCount = 4; 
  const location = useLocation().pathname
  const openLibraryCondition = !["/Login", "/SignUp"].includes(location) && (["/LikedSongs", "/Playlists","/FavoriteArtists"].includes(location) || isLibraryOpen)

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

  const iconDataURL = getIconAsSvgDataURL(<BsMusicNote color="black" size={60} />);

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = iconDataURL;
  }, [iconDataURL]);


  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect( () => {
    async function fetchData() {
      if(token){
        try{
          const res = await api.get("playlists/user")
                  setPlaylists(res)
                  return 
        }
        catch(err){
        }
      }
    }
    fetchData()
  }, [renderPlaylistsPage, token])
  

    useEffect(() => {
      if(currentPlaylistData){
      const updatedCurrentPlaylistData = playlists?.find((playlist) => playlist._id === currentPlaylistData?._id);
      setCurrentPlaylistData(updatedCurrentPlaylistData) 
      }
    },[playlists])

  
useEffect(() => {
  async function fetchData() {
    try {
      const res = await axios.request(options);
      handleSongsId(res.data.results);
      setFetchSongsRetryCount(0); 
    } catch (err) {
      if (fetchSongsRetryCount < maxFetchSongsRetryCount) {
        setTimeout(() => {
          setFetchSongsRetryCount((prevfetchSongsRetryCount) => prevfetchSongsRetryCount + 1);
        }, 1000);
      } 
    }
  }
  fetchData()
}, [userSearch, fetchSongsRetryCount]);

const handleSongsId = (songs, playPlaylist) => {
  const songsWithId = songs?.map((song, i) => {
    return {...song, index: i}});
    if(playPlaylist){
      return songsWithId? songsWithId : []
    }
    localStorage.setItem("searchSongs",JSON.stringify(songsWithId))
    setSongs(songsWithId);
}

const skipBackOrForward = (backOrForward, songsList) => {
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

 }

  return (
    <>
    <div className={styles.appContainer}>
      <Token.Provider value={{token, setToken}}>
      <PlaylistsContext.Provider value={{playlists, setPlaylists, setRenderPlaylistsPage, currentPlaylistData, setCurrentPlaylistData, likedSongsPlaylist, setLikedSongsPlaylist, playedPlaylist, setPlayedPlaylist}}>
      <HandlePlayingSongContext.Provider value={{songs, setSongs, songPlayed,setSongPlayed, isSongPlaying, setIsSongPlaying, handleSongsId, skipBackOrForward}}>
      {!["/Login", "/SignUp"].includes(location) && <Header backgroundVideo={backgroundVideo} isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} setUserSearch={setUserSearch} screenWidth={screenWidth}/>}
        <ShowPopupsContext.Provider value={{showCreatePlaylistPopup, setShowCreatePlaylistPopup, showAddToPlaylistPopup, setShowAddToPlaylistPopup}}>
      <Suspense fallback={<div className={styles.loadingContainer}></div>} >
        <Routes>
           <Route index element={<Home  backgroundVideo={backgroundVideo} isLibraryOpen={isLibraryOpen} setUserSearch={setUserSearch} screenWidth={screenWidth}/>} /> 
            {token && ( <>
              <Route path="/LikedSongs" element={<LikedSongs />} />
              <Route path="/Playlists"  element={<Playlists />} />
              <Route path="/FavoriteArtists" element={<FavoriteArtists setSongs={setSongs}/>} />
                </>)}
            <Route path="/Login" element={<Login setUserSearch={setUserSearch} />} />
            <Route path="/SignUp" element={<SignUp setUserSearch={setUserSearch} />} />
            <Route path="/Video" element={<VideoContainer />}/> 
        </Routes>
       </Suspense>
        {songPlayed && <Footer backgroundVideo={backgroundVideo} setBackgroundVideo={setBackgroundVideo} />}
        </ShowPopupsContext.Provider>
        {openLibraryCondition && <Library  backgroundVideo={backgroundVideo}/>}
        </HandlePlayingSongContext.Provider>
        </PlaylistsContext.Provider>
        </Token.Provider>
      </div>
    </>
  );
}

export default Layout;
