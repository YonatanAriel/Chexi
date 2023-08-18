import styles from "./style.module.css";
import { useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BsMusicNote } from "react-icons/bs";
import CreatePlaylist from "../../CreatePlaylist";
import Playlists from "../../../contexts/Playlists";
import HandlePlayingSongContext from "../../../contexts/HandlePlayingSong";
import ShowPopups from "../../../contexts/ShowPopups";
import Token from "../../../contexts/Token";
import api from "../../../apiCalls/apiCalls";

function AddToPlaylist() {
  const { playlists, setRenderPlaylistsPage, playedPlaylist } =
    useContext(Playlists);
  const { setShowAddToPlaylistPopup } = useContext(ShowPopups);
  const { songPlayed } = useContext(HandlePlayingSongContext);
  const { token } = useContext(Token);
  const songPlayedData = {
    title: songPlayed?.title,
    videoId: playedPlaylist ? songPlayed?.videoId : songPlayed?.id,
    songImg: playedPlaylist ? songPlayed?.songImg : songPlayed?.thumbnail.url,
    channelName: playedPlaylist
      ? songPlayed?.channelName
      : songPlayed?.channel.name,
    channelImg: playedPlaylist
      ? songPlayed?.channelImg
      : songPlayed?.channel.icon,
    duration: songPlayed?.duration,
    duration_formatted: songPlayed?.duration_formatted,
  };

  const addSongToPlaylist = async (playlist) => {
    setShowAddToPlaylistPopup(false);
    await api.post(`playlists/addsong/${playlist._id}`, songPlayedData);
    setRenderPlaylistsPage((prev) => !prev);
  };

  return (
    token && (
      <div className={styles.popup}>
        <div>
          <IoIosArrowDown
            size={60}
            onClick={() => setShowAddToPlaylistPopup(false)}
          />
          <span>Add to playlist</span>
        </div>
        <CreatePlaylist songPlayedData={songPlayedData} addSong={true} />
        <ul>
          {playlists
            ?.filter((playlist) => playlist.isFavorite === false)
            .map((playlist, i) => {
              return (
                <li key={i} onClick={() => addSongToPlaylist(playlist)}>
                  {playlist?.songsId[0]?.songImg ? (
                    <img
                      src={playlist?.songsId[0]?.songImg}
                      alt={playlist?.name}
                    />
                  ) : (
                    <div>
                      <BsMusicNote size={25} />
                      <span>Chexi</span>
                    </div>
                  )}
                  <span>{playlist?.name.substring(0, 20)}</span>
                </li>
              );
            })}
        </ul>
      </div>
    )
  );
}
export default AddToPlaylist;
