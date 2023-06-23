import AddArtist from "../../AddArtist";
import CreatePlaylist from "../../CreatePlaylist";
import styles from "./style.module.css";

function NewPlaylistOrArtist({ setShowPopup, page }) {
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.popup} onClick={() => setShowPopup(false)}>
      <div onClick={handlePopupClick}>
        {page === "favoriteArtists" ? (
          <AddArtist />
        ) : (
          <div className={styles.createPlaylist}>
            <CreatePlaylist setShowPopup={setShowPopup} placeHolder={"What is the playlist name?"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewPlaylistOrArtist;
