import styles from "./style.module.css";
import {RiPlayListAddFill} from "react-icons/ri"

function PlayLists() {
  return (
    <>
      <div className={styles.PlayListsContainer}>
        <div>
          <span>Create new playlist</span>
          <RiPlayListAddFill size={100} />
        </div>
      </div>
    </>
  );
}

export default PlayLists;
