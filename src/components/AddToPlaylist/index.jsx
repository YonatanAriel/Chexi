import styles from "./style.module.css";
import { HiPlus } from "react-icons/hi";

function AddToPlaylist({songs}) {
  return (
      <div className={styles.popup}>
        <div className={styles.createPlaylist} >
          <input
            type="text"
            className={styles.createPlaylistInput}
            placeholder="Create new playlist..."
          />
          <button className={styles.addPlaylistButton}>
            <HiPlus size={25} />
          </button>
        </div>
        {songs.length > 0 && (<ul >
           {songs.map((playlist) => {
            return (
              <li>
                <img src={playlist.thumbnail.url} alt="hiuhu" />
                <span>{playlist.channel.name.substring(0, 20)}</span>
              </li>
            );
          })}
        </ul>)}
      </div>
  );
}
export default AddToPlaylist;
{
  /* onKeyDown={(e) => {if(e.key === 'Enter') */
}
