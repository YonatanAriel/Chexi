import styles from "./style.module.css";
import { FireworkSpinner } from "react-spinners-kit";
import { useLocation } from "react-router-dom";

function Loading() {
  const location = useLocation().pathname;
  return (
    <div
      className={`${styles.loading} ${
        location === "/Playlists" && styles.playlistsLoading
      }`}
    >
      <FireworkSpinner color="wheat" size={200} />
    </div>
  );
}

export default Loading;
