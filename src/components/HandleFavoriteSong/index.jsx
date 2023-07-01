import {  FaRegHeart, FaHeart} from "react-icons/fa"
import styles from "./style.module.css"
import { useContext, useEffect, useState } from "react"
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong"
import User from "../../contexts/User"
import axios from "axios"
import Playlists from "../../contexts/Playlists"

function HandleFavoriteSong() {
    const user = useContext(User)
    const {songPlayed} = useContext(HandlePlayingSongContext)
    const {playlists, likedSongsPlaylist, setLikedSongsPlaylist} = useContext(Playlists) 
    const [likedSongsPlaylistId, setLikedSongsPlaylistId] = useState(playlists?.find(playlist => playlist.isFavorite === true)?._id)
    const [getLikedSongsPlaylist, setGetLikesSongsPlaylist] = useState(false)
    const [songPlayedData, setSongPlayedData] = useState()
      // {title: songPlayed?.title, videoId: songPlayed?.id, songImg: songPlayed?.thumbnail.url,
      // channelName: songPlayed?.channel.name, channelImg: songPlayed?.channel.icon,
      // duration: songPlayed?.duration ,duration_formatted: songPlayed?.duration_formatted, _id:null})
    
      useEffect(() => {
        setSongPlayedData((prev) => ({...prev, title: songPlayed?.title, videoId: songPlayed?.id, songImg: songPlayed?.thumbnail.url,
        channelName: songPlayed?.channel.name, channelImg: songPlayed?.channel.icon,
        duration: songPlayed?.duration ,duration_formatted: songPlayed?.duration_formatted}))}
      ,[songPlayed])
    
      useEffect(() => {
        //to get the liked songs playlist
        axios.post("http://localhost:1000/playlists/likedsongs", {userId: user.id})
        .then((res) => {
          console.log(res.data);
        setLikedSongsPlaylist(res.data);
        })
      },[likedSongsPlaylistId, getLikedSongsPlaylist])

    useEffect(() => {
      //to get the songPlayed mongo ID, so we can use it in the includes
      if(songPlayed?.id){
        axios.get(`http://localhost:1000/songs/getsong/${songPlayed.id}`)
        .then((res) => {
          console.log(res.data);
          setSongPlayedData((prev) =>   ({...prev, _id:res.data._id}))
        })
        .catch(err => console.log(err))
      }
    },[songPlayed,getLikedSongsPlaylist])

     const handleHeartClick = async (addOrRemove) => {
      //to add or remove song from liked songs, and create liked songs playlist if its not exist
      if(addOrRemove === "add"){
        if(!likedSongsPlaylistId){
          await (axios.post("http://localhost:1000/playlists/addplaylist", { name: "My favorite songs", userId: user.id, isFavorite: true })
          .then(res =>{
            setLikedSongsPlaylistId(res.data._id)
            console.log(res.data);
            setLikedSongsPlaylist(res.data)
          }).catch(err => console.log(err)))
        }
        else{
          axios.post(`http://localhost:1000/playlists/addsong/${likedSongsPlaylistId}`, songPlayedData)
          .then((res) => {
            console.log(res.data);
            setGetLikesSongsPlaylist(prev => !prev)
              })
                .catch(err => console.log(err))
          }
      }
    else{
      axios.post(`http://localhost:1000/playlists/deletesong/${likedSongsPlaylistId}`, {id: songPlayedData._id})
      .then((res) => {console.log(res)
        setGetLikesSongsPlaylist(prev => !prev)}
      )
      .catch(err => console.log(err))
    }
    }
    //need to delete / is Active: false if the song if its already exist in db
    useEffect(() => {  
      //to add the song to the playlist if it right now was created
      if(likedSongsPlaylistId && ((likedSongsPlaylist?.songsId?.includes(songPlayedData?._id) !== undefined)
       && (likedSongsPlaylist?.songsId?.includes(songPlayedData?._id) !== true))
      ){
      axios.post(`http://localhost:1000/playlists/addsong/${likedSongsPlaylistId}`, songPlayedData)
       .then((res) => {
        console.log(res.data);
        setGetLikesSongsPlaylist(prev => !prev)
      })
        .catch(err => console.log(err))
      }
    },[likedSongsPlaylistId])
      
  return ( <>
              {likedSongsPlaylist?.songsId?.find(song => song._id.toString() == songPlayedData?._id?.toString())? (<FaHeart size={18} style={{color:"red", cursor: "pointer"}} onClick={() => handleHeartClick("remove")} />)
                 :
               (<FaRegHeart size={18} className={styles.heart} onClick={() => handleHeartClick("add")}  />)}
           </>
  )
}

export default HandleFavoriteSong
