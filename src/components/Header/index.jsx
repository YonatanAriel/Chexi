import { Link } from 'react-router-dom'
import styles from './Style.module.css'
import {FaHeart} from 'react-icons/fa';
import {GiOppositeHearts} from 'react-icons/gi';
import {RiPlayListFill} from 'react-icons/ri'
import {HiLogin, HiLogout} from 'react-icons/hi';
import {AiFillHome} from 'react-icons/ai';
import {MdAssignmentInd} from 'react-icons/md';
import {BsMusicNote} from 'react-icons/bs';
function Header() {
  return ( <>
    <div className={styles.mainDiv}>
      <BsMusicNote size={40}/><h2 style={{marginLeft:"-63px", marginTop:"7px"}}>Chexi</h2>
    <Link to="./Home"><AiFillHome /><span>Home</span></Link>
    <Link to="./SignUp"><MdAssignmentInd /><span>Sign Up</span></Link>
    <Link to="./Login"><HiLogin /><HiLogout /><span>Log In</span></Link>
    <div className={styles.container} >
      <form action="/" method="GET" className={styles.form}>
        <input type="search" placeholder="What do you want to listen to?" className={styles.searchField} />
        <button type="submit" className={styles.searchButton}>
          <img src="src\photos\search.webp" />
        </button>
      </form>
    </div>
    <Link to="./LikedSongs"><FaHeart /><GiOppositeHearts /><span>Liked Songs</span></Link>
    <Link to="./PlayLists"><RiPlayListFill /><span>PlayLists</span></Link>
    </div>
    </>
  )
}

export default Header