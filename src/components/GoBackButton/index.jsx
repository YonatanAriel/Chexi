import styles from "./style.module.css";
import { BsArrowRightCircle } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function GoBackButton({ setShowSongs }) {
  const location = useLocation().pathname;

  const handleGoBack = () => {
    if (location === "/FavoriteArtists") {
      setShowSongs((prev) => ({
        ...prev,
        showArtistSongs: false,
        artistName: null,
      }));
    } else setShowSongs(false);
  };

  return (
    <div onClick={handleGoBack} className={styles.arrowButton}>
      <BsArrowRightCircle size={50} />
    </div>
  );
}

export default GoBackButton;
