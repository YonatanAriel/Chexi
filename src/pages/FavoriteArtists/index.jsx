import styles from "./style.module.css";
import { HiPlus } from "react-icons/hi";
import { BsFillPersonPlusFill, BsFillPlusCircleFill } from "react-icons/bs";
import { useState } from "react";
import Playlist from "../../components/playlist";

function FavoriteArtists({ songs, songPlayed }) {
  const artists = ["ישי ריבו", "שלמה ארצי", "housier"];
  const [showArtistPopup, setShowArtistPopup] = useState(false);
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };
  return (
    <>
    {/*  */}
      {/* <Playlist songPlayed={songPlayed} songs={songs}/> */}
      {showArtistPopup && (
        <div className={styles.popup}  onClick={() => setShowArtistPopup(false) }>
        <div onClick={handlePopupClick}>
          <div className={styles.addNewArtistPopup}>
            <input
              type="text"
              className={styles.popupInput}
              placeholder="What is the artist name?"
            />
            <button className={styles.popupButton}>
              <HiPlus size={25} />
            </button>
          </div>{" "}
        </div>
        </div>
      )}
      <div className={styles.FavoriteArtistsContainer}>
        <div className={styles.addNewArtistContainer}>
          <span>Add new artist</span>
          <div
            className={styles.addArtistButton}
            onClick={() => setShowArtistPopup(true)}
          >
            <BsFillPersonPlusFill size={90} />
          </div>
        </div>
        <div className={styles.artistsContainer}>
          {songs.map((song, i) => {
            return (
              <div key={i} className={styles.artist}>
                <img src={song.channel.icon} alt={artists[i]} />
                <span>{song.channel.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default FavoriteArtists;
