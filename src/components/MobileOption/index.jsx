import { useState, useContext } from "react";
import styles from "./style.module.css"
import {ImMenu} from "react-icons/im"
import { HiLogin, HiLogout } from "react-icons/hi";
import { MdAssignmentInd } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import {FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import Token from "../../contexts/Token";
import { Link, useLocation } from "react-router-dom";

function MobileOption({handleLogout, setIsLibraryOpen, backgroundVideo, setBackgroundVideo}) {
    const location = useLocation().pathname;
    const { token } = useContext(Token);
    const [showDropDownContent, setShowDropDownContent] = useState(false);
    const togleDropDown = () =>  setShowDropDownContent(prev => !prev);
    const handleBackgrundVideo = () => setBackgroundVideo((prev) => !prev);
   
  

    return <>
            <div className={styles.dropBtn}><ImMenu size={27} onClick={togleDropDown} /></div>
            {showDropDownContent && <div className={styles.dropDownContent}>
          {token? (
            <Link
              to="/"
              onClick={() => {handleLogout();
                       togleDropDown();} }
            >
              <HiLogout size={19} style={{ margin: "0 .3em -0.7vh 0"}} />
              <span>Log out</span>
            </Link>
          ) : (
             (<Link to="./Login">
              <HiLogin size={19} style={{ margin: "0 .3em -0.6vh 0"  }} />
              <span>Log In</span>
            </Link>)
          )}
          {!token && (
            <Link to="./SignUp">
              <MdAssignmentInd style={{ margin: "0  .3em -0.3vh 0" }} />
              <span>Sign Up</span>
            </Link>
          )}
            {["/LikedSongs", "/Playlists", "/FavoriteArtists"].includes(location) && <a 
            onClick={() => { 
              setIsLibraryOpen((prev) => !prev);
              togleDropDown();
            }}>
              <IoLibrary size={17} style={{ margin: "0 .3em -0.2vh 0" }} />
              Library
            </a>}
            {!backgroundVideo?(
              <a 
                onClick={ () => {
                   togleDropDown();
                   handleBackgrundVideo(); }} >
                <FaExpandArrowsAlt
                  size={17}
                  style={{ margin: "0 .3em -0.4vh 0" }}
                  className={styles.iconButton}
                  />
                  <span>Visualizer</span>
              </a>
            ):( 
              <a 
              onClick={ () => {
                togleDropDown();
                handleBackgrundVideo(); }} >
                <FaCompressArrowsAlt
                  size={17}
                  onClick={handleBackgrundVideo}
                  style={{ margin: "0 .3em -0.4vh 0" }}
                  className={styles.iconButton}
                  />
                  <span>Visualizer</span>
            </a>
            )}

                </div>}
          </>
}

export default MobileOption