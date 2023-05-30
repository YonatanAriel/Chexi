import { Link, useNavigate } from 'react-router-dom'
import styles from './Style.module.css'
import {FaHeart} from 'react-icons/fa';
import {GiOppositeHearts} from 'react-icons/gi';
import {RiPlayListFill} from 'react-icons/ri'
import {HiLogin, HiLogout} from 'react-icons/hi';
import {AiFillHome} from 'react-icons/ai';
import {MdAssignmentInd} from 'react-icons/md';
import {BsMusicNote} from 'react-icons/bs';
import Search from '../Search';
function Header({setUserSearch}) {
  return ( <>
      <div className={styles.logoBackground}><BsMusicNote style={{marginBottom:"8px"/*marginBottom:"1.5vh"*/}} size={55}/><span className={styles.logoText}>Chex<span className={styles.redDot}>i</span></span></div>
      <div className={styles.mainDiv}>
      <Link className={styles.home} to="./"><AiFillHome /*className={styles.red}*/ /><span>Home</span></Link>
    <Link to="./LikedSongs" className={styles.disappearItemsWhenScreenShrink}><FaHeart size={15} /><span >Liked Songs</span></Link>
    <Link to="./PlayLists" className={styles.disappearItemsWhenScreenShrink}><RiPlayListFill size={17} style={{marginBottom:"-0.3vh"}} /><span>PlayLists</span></Link>
    <Search setUserSearch={setUserSearch} />
    <Link to="./Login"><HiLogin size={19} style={{marginBottom:"-0.6vh"}}/>{/*<HiLogout />*/}<span >Log In</span></Link>
    <Link to="./SignUp"><MdAssignmentInd  style={{marginBottom:"-0.3vh"}}/><span >Sign Up</span></Link>
    </div>
    </>
  )
}

export default Header