import styles from "./style.module.css";
import { useContext, useEffect, useState } from "react";
import Playlist from "../../components/playlist";
import Playlists from "../../contexts/Playlists";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import api from "../../apiCalls/apiCalls";

function LikedSongs({ libraryWidth, screenWidth }) {
  const {
    likedSongsPlaylist,
    setLikedSongsPlaylist,
    playedPlaylist,
    setPlayedPlaylist,
  } = useContext(Playlists);
  const { songPlayed, handleSongsId, setSongPlayed } = useContext(
    HandlePlayingSongContext
  );
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    async function getLikesSongsPlaylist() {
      const res = await api.get("playlists/likedsongs");
      setLikedSongsPlaylist(res);
      setLikedSongs(handleSongsId(res?.songsId, true));
    }
    getLikesSongsPlaylist();
  }, []);

  useEffect(() => {
    const newSongs = handleSongsId(likedSongsPlaylist?.songsId, true);
    const isLikedSongPlaylistPlayed =
      JSON.stringify(likedSongs) === JSON.stringify(playedPlaylist);
    if (isLikedSongPlaylistPlayed && likedSongs.length > 0) {
      if (playedPlaylist.length > newSongs.length) {
        const playedSongIndex = playedPlaylist?.findIndex(
          (song) => song._id === songPlayed?._id
        );
        const newSongToPlay =
          playedSongIndex === newSongs.length
            ? newSongs[0]
            : newSongs[playedSongIndex];
        setSongPlayed(newSongToPlay);
      }
      setPlayedPlaylist(newSongs);
    }
    setLikedSongs(newSongs);
  }, [likedSongsPlaylist]);

  return (
    <>
      <Playlist
        screenWidth={screenWidth}
        libraryWidth={libraryWidth}
        songs={likedSongs}
        title={"My favorite songs"}
      />
    </>
  );
}

export default LikedSongs;
