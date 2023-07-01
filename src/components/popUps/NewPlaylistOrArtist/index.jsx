import { useContext } from "react";
import AddArtist from "../../AddArtist";
import CreatePlaylist from "../../CreatePlaylist";
import styles from "./style.module.css";
import ShowPopups from "../../../contexts/ShowPopups";

function NewPlaylistOrArtist({ setShowPopup, page }) {

  const {showCreatePlaylistPopup, setShowCreatePlaylistPopup} = useContext(ShowPopups)
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };
  const handleClick = () => {
   if(showCreatePlaylistPopup){
     setShowCreatePlaylistPopup(false)
      return
   } 
  setShowPopup && setShowPopup(false)
  }
  return (
    <div className={styles.popup} onClick={handleClick}>
      <div onClick={handlePopupClick}>       
        {page === "favoriteArtists" ? (
          <AddArtist setShowPopup={setShowPopup} />
        ) : (
          <div className={styles.createPlaylist}>
            <CreatePlaylist placeHolder={"What is the playlist name?"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewPlaylistOrArtist;
