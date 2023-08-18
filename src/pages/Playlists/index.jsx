import styles from "./style.module.css";
import { useContext, useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import NewPlaylistOrArtist from "../../components/popUps/NewPlaylistOrArtist";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import PlaylistCard from "../../components/PlaylistCard";
import Playlist from "../../components/playlist";
import PlaylistsContext from "../../contexts/Playlists";
import ShowPopups from "../../contexts/ShowPopups";
import Loading from "../../components/Loading";

function Playlists({ libraryWidth, screenWidth }) {
  const { handleSongsId } = useContext(HandlePlayingSongContext);
  const { showCreatePlaylistPopup, setShowCreatePlaylistPopup } =
    useContext(ShowPopups);
  const { playlists, setRenderPlaylistsPage, currentPlaylistData } =
    useContext(PlaylistsContext);
  const [showSongs, setShowSongs] = useState(false);
  const [filteredPlaylists, setFilteredPlaylists] = useState();
  const containerWidth =
    libraryWidth == 0 || screenWidth < 900
      ? "100vw"
      : `calc(100vw - ${libraryWidth})`;

  useEffect(() => setRenderPlaylistsPage((prev) => !prev), []);

  useEffect(() => {
    setFilteredPlaylists(
      playlists?.filter((playlist) => playlist.isFavorite === false)
    );
  }, [playlists]);

  return (
    <>
      {showSongs ? (
        <Playlist
          screenWidth={screenWidth}
          libraryWidth={libraryWidth}
          title={currentPlaylistData.name}
          setShowSongs={setShowSongs}
          songs={handleSongsId(currentPlaylistData.songsId, true)}
        />
      ) : (
        <>
          {showCreatePlaylistPopup && <NewPlaylistOrArtist />}
          <div
            className={styles.PlaylistsContainer}
            style={{
              width: containerWidth,
              left: screenWidth < 900 ? 0 : libraryWidth,
            }}
          >
            <div>
              <span>New playlist</span>
              <div
                className={styles.newPlaylistBtn}
                onClick={() => setShowCreatePlaylistPopup((prev) => !prev)}
              >
                <IoMdAddCircleOutline
                  size={screenWidth > 380 ? 115 : 75}
                  style={{ marginTop: "15px" }}
                />
              </div>
            </div>
            <div>
              {filteredPlaylists ? (
                filteredPlaylists?.map((playlist, i) => {
                  return (
                    <PlaylistCard
                      setShowSongs={setShowSongs}
                      key={i}
                      playlist={playlist}
                    />
                  );
                })
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Playlists;
