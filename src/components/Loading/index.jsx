import {FireworkSpinner} from "react-spinners-kit";
import styles from "./style.module.css"
import { useLocation } from "react-router-dom";

function Loading() {
    const location = useLocation().pathname
  return (
    <div
      className={`${styles.loading} ${location === "/Playlists" && styles.playlistsLoading}`}
    //   width: location === "/" ? "100vw" : "100%"
    >
      <FireworkSpinner color="wheat"  size={200} />
    </div>
  );
}

export default Loading;
