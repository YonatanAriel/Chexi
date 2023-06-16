import styles from './style.module.css'
import {FaHeart} from 'react-icons/fa';
import {RiPlayListFill, RiPlayList2Fill} from 'react-icons/ri'
import { NavLink } from 'react-router-dom';
import {BsPersonHearts} from 'react-icons/bs'

export default function Library(){
    return <>
    <div className={styles.libraryContainer}>
          <NavLink to="./LikedSongs" className={({isActive}) => isActive && styles.active} ><FaHeart size={15} /><span >Liked Songs</span></NavLink>
          <NavLink to="./PlayLists" className={({isActive}) => isActive && styles.active}><RiPlayListFill size={17} style={{marginBottom:"-0.3vh"}} /><span>PlayLists</span></NavLink>
          <NavLink to="./FavoriteArtists" className={({isActive}) => isActive && styles.active}><BsPersonHearts style={{marginBottom:"-0.3vh"}} /><span>Favorite Artists</span></NavLink>
    </div>
           </>
}
