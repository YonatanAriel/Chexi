import styles from "./style.module.css";
import { BsFillPersonPlusFill, BsFillPlusCircleFill } from "react-icons/bs";
import { useContext, useState } from "react";
import Playlist from "../../components/playlist";
import NewPlaylistOrArtist from "../../components/popUps/newPlaylistOrArtist";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";

function FavoriteArtists() {
  const artists = ["ישי ריבו", "שלמה ארצי", "housier"];
  const [showPopup, setShowPopup] = useState(false);
  const {songs, songPlayed} = useContext(HandlePlayingSongContext)
  return (
    <>
      {/* <Playlist songPlayed={songPlayed} songs={songs}/> */}
      {showPopup && (<NewPlaylistOrArtist setShowPopup={setShowPopup} page={"favoriteArtists"} />)}
            
      <div className={styles.FavoriteArtistsContainer}>
        <div className={styles.addNewArtistContainer}>
          <span>New artist</span>
          <div
            className={styles.addArtistButton}
            onClick={() => setShowPopup(true)}
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
