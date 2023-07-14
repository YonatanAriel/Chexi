import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Style.module.css'
import {GiOppositeHearts} from 'react-icons/gi';
import {HiLogin, HiLogout} from 'react-icons/hi';
import {AiFillHome} from 'react-icons/ai';
import {MdAssignmentInd} from 'react-icons/md';
import {BsMusicNote} from 'react-icons/bs';
import Search from '../Search';
import { IoLibrary } from 'react-icons/io5';
import { useContext } from 'react';
import Token from '../../contexts/Token';
import Playlists from '../../contexts/Playlists';

function Header({setUserSearch,isLibraryOpen, setIsLibraryOpen, backgroundVideo}) {
  const changeStyleForLibrary = ["/LikedSongs", "/Playlists","/FavoriteArtists"].includes(useLocation().pathname) || isLibraryOpen;
  const {token, setToken} = useContext(Token)
  const {setLikedSongsPlaylist} = useContext(Playlists)
return ( <>
      <div   className={styles.logoBackground} style={{padding: changeStyleForLibrary && !backgroundVideo && "6vh 0 0 1.5vw"}}><BsMusicNote style={{marginBottom:"8px"/*marginBottom:"1.5vh"*/}} size={55}/><span className={styles.logoText}>Chexi</span></div>
      {/* style={{backgroundColor: backgroundVideo && "black"}} */}
      <div  className={`${styles.mainDiv} ${changeStyleForLibrary? styles.libraryOpenMainDiv : ""}`} >
        <div className={styles.home_library_search}>
          <Link className={styles.home} to="./"><AiFillHome /*className={styles.red}*/ /><span>Home</span></Link>
          <a onClick={() => setIsLibraryOpen((prev) => !prev)}><IoLibrary style={{margin:"0 0.1vw -0.2vh 0"}}/>Library</a>    
          <Search setUserSearch={setUserSearch} />
        </div>
        <div className={styles.signAndLogDIv}>
        {token? (<Link to="/" onClick={() => {
           localStorage.setItem("token", null)
           setLikedSongsPlaylist(null)
        setToken(null)}} ><HiLogout size={19} style={{marginBottom:"-0.6vh"}}/><span >Log out</span></Link>)
         : <Link to="./Login"><HiLogin size={19} style={{marginBottom:"-0.6vh"}}/><span >Log In</span></Link>}
         {!token && <Link to="./SignUp"><MdAssignmentInd  style={{marginBottom:"-0.3vh"}}/><span >Sign Up</span></Link>}
        </div>
    </div>
    </>
  )
}

export default Header