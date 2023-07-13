import { FaRegHeart, FaHeart } from "react-icons/fa";
import styles from "./style.module.css";
import { useContext, useEffect, useState } from "react";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import axios from "axios";
import Playlists from "../../contexts/Playlists";
import Token from "../../contexts/Token";

function HandleFavoriteSong() {
  const { songPlayed } = useContext(HandlePlayingSongContext);
  const { playlists, likedSongsPlaylist, setLikedSongsPlaylist, playedPlaylist } = useContext(Playlists);
  const [isFavorite, setIsFavorite] = useState();
  const [likedSongsPlaylistId, setLikedSongsPlaylistId] = useState(
    playlists?.find((playlist) => playlist.isFavorite === true)?._id
  );
  const [getLikedSongsPlaylist, setGetLikesSongsPlaylist] = useState(false);
  const [songPlayedData, setSongPlayedData] = useState();
  const { token } = useContext(Token);
  // {title: songPlayed?.title, videoId: songPlayed?.id, songImg: songPlayed?.thumbnail.url,
  // channelName: songPlayed?.channel.name, channelImg: songPlayed?.channel.icon,
  // duration: songPlayed?.duration ,duration_formatted: songPlayed?.duration_formatted, _id:null})

  useEffect(() => {
    setSongPlayedData((prev) => ({
      ...prev,
      title: songPlayed?.title,
      videoId: playedPlaylist? songPlayed?.videoId : songPlayed?.id,
      songImg: playedPlaylist? songPlayed?.songImg : songPlayed?.thumbnail?.url,
      channelName: playedPlaylist? songPlayed?.channelName : songPlayed?.channel?.name,
      channelImg: playedPlaylist? songPlayed?.channelImg : songPlayed?.channel?.icon,
      duration: songPlayed?.duration,
      duration_formatted: songPlayed?.duration_formatted,
    }));
  }, [songPlayed]);
  useEffect(() => {
    if (token &&
      likedSongsPlaylist?.songsId?.find(
        (song) =>
          song?.videoId?.toString() === songPlayedData?.videoId?.toString()
      )
    ) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [songPlayedData, likedSongsPlaylist]);

  useEffect(() => {
    //to get the liked songs playlist
    if(token){
    axios
      .get("http://localhost:1000/playlists/likedsongs", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLikedSongsPlaylist(res.data);
      })
      .catch((err) => console.log(err));
  }}, [likedSongsPlaylistId]);
  // },[likedSongsPlaylistId, getLikedSongsPlaylist])

  // useEffect(() => {
  //to get the songPlayed mongo ID, so we can use it in the includes
  //   if(songPlayed?.id){
  //     axios.get(`http://localhost:1000/songs/getsong/${songPlayed.id}` , {headers: {
  //       authorization: `Bearer ${token}`
  //     }})
  //     .then((res) => {
  //       console.log(res.data);
  //       setSongPlayedData((prev) =>   ({...prev, _id:res.data._id}))
  //     })
  //     .catch(err => console.log(err))
  //   }
  // },[songPlayed,getLikedSongsPlaylist])

  const handleHeartClick = async (addOrRemove) => {
    //to add or remove song from liked songs, and create liked songs playlist if its not exist
    if(token){
    if (addOrRemove === "add") {
      if (!likedSongsPlaylistId) {
        await axios
          .post(
            "http://localhost:1000/playlists/addplaylist",
            { name: "My favorite songs", isFavorite: true },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setLikedSongsPlaylistId(res.data._id);
            console.log(res.data);
            // setLikedSongsPlaylist(res.data)
          })
          .catch((err) => console.log(err));
      } else {
        // if (
        // !likedSongsPlaylist?.songsId?.find(
        //   (song) =>
        //     song?.videoId?.toString() === songPlayedData?.videoId?.toString()

        // isFavorite
        // ) {
        if (!isFavorite) {
          setIsFavorite(true);
          axios
            .post(
              `http://localhost:1000/playlists/addsong/${likedSongsPlaylistId}`,
              songPlayedData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              console.log(res.data);
              if (!likedSongsPlaylist.songsId.includes(res.data)) {
                setLikedSongsPlaylist((prev) => ({
                  ...prev,
                  songsId: [...prev.songsId, res.data],
                }));
              }
              // setGetLikesSongsPlaylist(prev => !prev)
            })
            .catch((err) => console.log(err));
        }
      }
      // }
    } else {
      if (isFavorite) {
        setIsFavorite(false);
        axios
          .post(
            `http://localhost:1000/playlists/deletesong/${likedSongsPlaylistId}`,
            {
              id: likedSongsPlaylist.songsId.find(
                (song) => song.videoId === songPlayedData.videoId
              )?._id,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setLikedSongsPlaylist((prev) => ({
              ...prev,
              songsId: prev.songsId.filter(
                (song) => song._id !== res.data.songId
              ),
            }));
            // setGetLikesSongsPlaylist(prev => !prev)}
          })
          .catch((err) => console.log(err));
      }
    }
  }
  };
  //need to delete / is Active: false if the song if its already exist in db
  useEffect(() => {
    //to add the song to the playlist if it right now was created
    if(token){
    if ( 
      !isFavorite &&
      likedSongsPlaylistId 
      // && ((likedSongsPlaylist?.songsId?.includes(songPlayedData?._id) !== undefined)
      // !likedSongsPlaylist?.songsId?.find(
      //   (song) =>
      //     song?.videoId?.toString() === songPlayedData?.videoId?.toString()
      // )
    ) {
      setIsFavorite(true);
      axios
        .post(
          `http://localhost:1000/playlists/addsong/${likedSongsPlaylistId}`,
          songPlayedData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (!likedSongsPlaylist.songsId.includes(res.data)) {
            setLikedSongsPlaylist((prev) => ({
              ...prev,
              songsId: [...prev.songsId, res.data],
            }));
          }
          // setGetLikesSongsPlaylist(prev => !prev)
        })
        .catch((err) => console.log(err));
    }
  }
  }, [likedSongsPlaylistId]);

  return (
   token? (
    <>
    {/* {likedSongsPlaylist?.songsId?.find(song => song?._id?.toString() == songPlayedData?._id?.toString())? */}
      {(isFavorite
      || likedSongsPlaylist?.songsId?.find(
        (song) =>
          song?.videoId?.toString() === songPlayedData?.videoId?.toString()
      )) ? 
      (
        <FaHeart
          size={18}
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleHeartClick("remove")}
        />
      ) : (
        <FaRegHeart
          size={18}
          className={styles.heart}
          onClick={() => handleHeartClick("add")}
        />
      )}
    </>) 
    : (<FaRegHeart size={18} className={styles.heart} />)

  );
}

export default HandleFavoriteSong;
