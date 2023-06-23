import styles from "./style.module.css"
import { HiPlus } from "react-icons/hi";


function AddArtist() {
  return (
    <div className={styles.addNewArtistPopup}>
    <input
      type="text"
      className={styles.popupInput}
      placeholder="What is the artist name?"
    />
    <button className={styles.popupButton}>
      <HiPlus size={25} />
    </button>
  </div>

  )
}

export default AddArtist
