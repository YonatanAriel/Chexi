import styles from "./style.module.css";
import { useContext } from "react";
import AddArtist from "../../AddArtist";
import CreatePlaylist from "../../CreatePlaylist";
import ShowPopups from "../../../contexts/ShowPopups";

function NewPlaylistOrArtist({ setShowPopup, page }) {
  const { showCreatePlaylistPopup, setShowCreatePlaylistPopup } =
    useContext(ShowPopups);

  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  const handleClick = () => {
    if (showCreatePlaylistPopup) {
      setShowCreatePlaylistPopup(false);
      return;
    }
    setShowPopup && setShowPopup(false);
  };

  return (
    <div className={styles.popup} onClick={handleClick}>
      <div onClick={handlePopupClick}>
        <h1>
          {page === "favoriteArtists"
            ? "What is the artist name?"
            : "What is the playlist name?"}
        </h1>
        {page === "favoriteArtists" ? (
          <AddArtist setShowPopup={setShowPopup} />
        ) : (
          <div className={styles.createPlaylist}>
            <CreatePlaylist placeHolder={"Playlist name"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewPlaylistOrArtist;
