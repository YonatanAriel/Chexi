import styles from './style.module.css'
import {FaHeart} from 'react-icons/fa';
import {RiPlayListFill, RiPlayList2Fill} from 'react-icons/ri'
import { Link } from 'react-router-dom';

export default function Library(){
    return <>
    <div className={styles.libraryContainer}>
          <Link to="./LikedSongs" ><FaHeart size={15} /><span >Liked Songs</span></Link>
          <Link to="./PlayLists" ><RiPlayListFill size={17} style={{marginBottom:"-0.3vh"}} /><span>PlayLists</span></Link>
          <Link to="./FavoriteArtists"><span>Favorite Artists</span></Link>
    </div>
           </>

}
