import styles from './style.module.css'
import {FaHeart} from 'react-icons/fa';
import {RiPlayListFill} from 'react-icons/ri'
import { NavLink } from 'react-router-dom';
import {BsPersonHearts} from 'react-icons/bs'
import ContactDetails from '../../ContactDetails';

export default function Library({backgroundVideo, libraryWidth}){
    return <>
    <div className={styles.libraryContainer} style={{backgroundColor: backgroundVideo && "transparent", width:libraryWidth}}>
      <div className={styles.linksContainer}>
            <NavLink to="./LikedSongs" className={({isActive}) => isActive? styles.active : undefined} >
              <FaHeart size={15} /><span >Liked Songs</span>
              </NavLink>
            <NavLink to="./Playlists" className={({isActive}) => isActive? styles.active : undefined}>
              <RiPlayListFill size={17} style={{marginBottom:"-0.3vh"}} /><span>Playlists</span>
              </NavLink>
            <NavLink to="./FavoriteArtists" className={({isActive}) => isActive? styles.active : undefined}>
              <BsPersonHearts style={{marginBottom:"-0.3vh"}} /><span>Favorite Artists</span>
              </NavLink>
            </div>
    <div className={styles.contact}><ContactDetails /></div>
            </div>
           </>
}
