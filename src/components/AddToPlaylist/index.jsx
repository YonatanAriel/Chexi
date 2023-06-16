import styles from "./style.module.css";
import {HiPlus} from "react-icons/hi"

function AddToPlaylist() {
  return (
    <>
      <div className={styles.popup}>
        <div className={styles.createPlaylist}>
          <input
            type="text"
            className={styles.createPlaylistInput}
            placeholder="Create new playlist..."/>
          <button className={styles.addPlaylistButton}>
            <HiPlus size={25} />
          </button>
        </div>
      </div>
    </>
  );
}
export default AddToPlaylist;
{
  /* onKeyDown={(e) => {if(e.key === 'Enter') */
}
