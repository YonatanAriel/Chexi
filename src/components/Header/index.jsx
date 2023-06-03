import { Link, useNavigate } from 'react-router-dom'
import styles from './Style.module.css'
import {GiOppositeHearts} from 'react-icons/gi';
import {HiLogin, HiLogout} from 'react-icons/hi';
import {AiFillHome} from 'react-icons/ai';
import {MdAssignmentInd} from 'react-icons/md';
import {BsMusicNote} from 'react-icons/bs';
import Search from '../Search';
import { IoLibrary } from 'react-icons/io5';

function Header({setUserSearch,isLibraryOpen, setIsLibraryOpen}) {
  return ( <>
  <div></div>
      <div style={{padding: isLibraryOpen && "3vh 0 0 1vw"}}  className={styles.logoBackground}><BsMusicNote style={{marginBottom:"8px"/*marginBottom:"1.5vh"*/}} size={55}/><span className={styles.logoText}>Chexi</span></div>
      <div style={{width: isLibraryOpen? "78vw" : "88vw",left: isLibraryOpen? "22vw" : "164px",borderBottomLeftRadius: isLibraryOpen &&  "0"}} className={styles.mainDiv}>
        <div className={styles.home_library_search}>
          <Link className={styles.home} to="./"><AiFillHome /*className={styles.red}*/ /><span>Home</span></Link>
          <a onClick={() => setIsLibraryOpen((prev) => !prev)}><IoLibrary style={{margin:"0 0.1vw -0.2vh 0"}}/>Library</a>    
          <Search setUserSearch={setUserSearch} />
        </div>
        <div className={styles.signAndLogDIv}>
          <Link to="./Login"><HiLogin size={19} style={{marginBottom:"-0.6vh"}}/>{/*<HiLogout />*/}<span >Log In</span></Link>
          <Link to="./SignUp"><MdAssignmentInd  style={{marginBottom:"-0.3vh"}}/><span >Sign Up</span></Link>
        </div>
    </div>
    </>
  )
}

export default Header