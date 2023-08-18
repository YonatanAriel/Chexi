import styles from "./style.module.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import Playlists from "../../contexts/Playlists";
import Token from "../../contexts/Token";
import api from "../../apiCalls/apiCalls";

function HandleFavoriteSong({ screenWidth }) {
  const { songPlayed } = useContext(HandlePlayingSongContext);
  const {
    playlists,
    likedSongsPlaylist,
    setLikedSongsPlaylist,
    playedPlaylist,
  } = useContext(Playlists);
  const [isFavorite, setIsFavorite] = useState();
  const [likedSongsPlaylistId, setLikedSongsPlaylistId] = useState(
    playlists?.find((playlist) => playlist.isFavorite === true)?._id
  );
  const [songPlayedData, setSongPlayedData] = useState();
  const { token } = useContext(Token);
  const [isAnimationInProgress, setIsAnimationInProgress] = useState(false);
  const [isHeartCliked, setIsHeartCliked] = useState({
    red: false,
    empty: false,
  });
  const heartSize = screenWidth > 500 ? 19 : 35;

  useEffect(() => {
    setSongPlayedData((prev) => ({
      ...prev,
      title: songPlayed?.title,
      videoId: playedPlaylist ? songPlayed?.videoId : songPlayed?.id,
      songImg: playedPlaylist
        ? songPlayed?.songImg
        : songPlayed?.thumbnail?.url,
      channelName: playedPlaylist
        ? songPlayed?.channelName
        : songPlayed?.channel?.name,
      channelImg: playedPlaylist
        ? songPlayed?.channelImg
        : songPlayed?.channel?.icon,
      duration: songPlayed?.duration,
      duration_formatted: songPlayed?.duration_formatted,
    }));
  }, [songPlayed]);

  useEffect(() => {
    if (
      token &&
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
    async function getLikesSongsPlaylist() {
      if (token) {
        const res = await api.get("playlists/likedsongs");
        setLikedSongsPlaylist(res);
      }
    }
    getLikesSongsPlaylist();
  }, [likedSongsPlaylistId]);

  const handleHeartClick = async (addOrRemove) => {
    if (isAnimationInProgress) return;
    let animationDuration = 1000;
    setIsAnimationInProgress(true);

    if (addOrRemove === "add") {
      setIsHeartCliked((prev) => ({ ...prev, empty: true }));
      animationDuration = 600;
      if (!likedSongsPlaylistId) {
        const likedSongsPlaylistRes = await api.post("playlists/addplaylist", {
          name: "My favorite songs",
          isFavorite: true,
        });
        setLikedSongsPlaylistId(likedSongsPlaylistRes._id);
      } else {
        if (!isFavorite) {
          setIsFavorite(true);
          const newFavoriteSongId = await api.post(
            `playlists/addsong/${likedSongsPlaylistId}`,
            songPlayedData
          );
          if (!likedSongsPlaylist.songsId.includes(newFavoriteSongId)) {
            setLikedSongsPlaylist((prev) => ({
              ...prev,
              songsId: [...prev.songsId, newFavoriteSongId],
            }));
          }
        }
      }
    } else {
      setIsHeartCliked((prev) => ({ ...prev, red: true }));
      if (isFavorite) {
        setIsFavorite(false);
        const removedSong = await api.post(
          `playlists/deletesong/${likedSongsPlaylistId}`,
          {
            id: likedSongsPlaylist.songsId.find(
              (song) => song.videoId === songPlayedData.videoId
            )?._id,
          }
        );
        setLikedSongsPlaylist((prev) => ({
          ...prev,
          songsId: prev.songsId.filter(
            (song) => song._id !== removedSong.songId
          ),
        }));
      }
    }
    setTimeout(() => {
      setIsAnimationInProgress(false);
      setIsHeartCliked({ red: false, empty: false });
    }, animationDuration);
  };

  useEffect(() => {
    async function addSongToPlaylist() {
      if (!isFavorite && likedSongsPlaylistId) {
        setIsFavorite(true);
        const newFavoriteSongId = await api.post(
          `playlists/addsong/${likedSongsPlaylistId}`,
          songPlayedData
        );
        if (!likedSongsPlaylist?.songsId?.includes(newFavoriteSongId)) {
          setLikedSongsPlaylist((prev) => ({
            ...prev,
            songsId: [newFavoriteSongId],
          }));
        }
      }
    }
    addSongToPlaylist();
  }, [likedSongsPlaylistId]);

  return token ? (
    <>
      {isFavorite ||
      likedSongsPlaylist?.songsId?.find(
        (song) =>
          song?.videoId?.toString() === songPlayedData?.videoId?.toString()
      ) ? (
        <FaHeart
          size={heartSize}
          className={`${isAnimationInProgress ? styles.disabledHeart : ""}
          ${isHeartCliked.empty ? styles.pulseHeart : ""}
            `}
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleHeartClick("remove")}
        />
      ) : (
        <FaRegHeart
          size={heartSize}
          className={`${styles.heart}
          ${isAnimationInProgress ? styles.disabledHeart : ""}
          ${isHeartCliked.red ? styles.emptyHeart : ""}
          `}
          onClick={() => handleHeartClick("add")}
        />
      )}
    </>
  ) : (
    <FaRegHeart size={heartSize} />
  );
}

export default HandleFavoriteSong;
