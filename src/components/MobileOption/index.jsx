import { useState, useContext } from "react";
import styles from "./style.module.css";
import { ImMenu } from "react-icons/im";
import { HiLogin, HiLogout } from "react-icons/hi";
import { MdAssignmentInd } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import Token from "../../contexts/Token";
import { Link, useLocation } from "react-router-dom";

function MobileOption({
  handleLogout,
  setIsLibraryOpen,
  backgroundVideo,
  setBackgroundVideo,
}) {
  const location = useLocation().pathname;
  const { token } = useContext(Token);
  const [showDropDownContent, setShowDropDownContent] = useState(false);
  const toggleDropDown = () => setShowDropDownContent((prev) => !prev);
  const handleBackgroundVideo = () => setBackgroundVideo((prev) => !prev);

  return (
    <>
      <div className={styles.dropBtn}>
        <ImMenu size={27} onClick={toggleDropDown} />
      </div>
      {showDropDownContent && (
        <div className={styles.dropDownContent}>
          {token ? (
            <Link
              to="/"
              onClick={() => {
                handleLogout();
                toggleDropDown();
              }}
            >
              <HiLogout size={19} style={{ margin: "0 .3em -0.7vh 0" }} />
              <span>Log out</span>
            </Link>
          ) : (
            <Link to="./Login">
              <HiLogin size={19} style={{ margin: "0 .3em -0.6vh 0" }} />
              <span>Log In</span>
            </Link>
          )}
          {!token && (
            <Link to="./SignUp">
              <MdAssignmentInd style={{ margin: "0  .3em -0.3vh 0" }} />
              <span>Sign Up</span>
            </Link>
          )}
          {["/LikedSongs", "/Playlists", "/FavoriteArtists"].includes(
            location
          ) && (
            <a
              onClick={() => {
                setIsLibraryOpen((prev) => !prev);
                toggleDropDown();
              }}
            >
              <IoLibrary size={17} style={{ margin: "0 .3em -0.2vh 0" }} />
              Library
            </a>
          )}
          {!backgroundVideo ? (
            <a
              onClick={() => {
                toggleDropDown();
                handleBackgroundVideo();
              }}
            >
              <FaExpandArrowsAlt
                size={17}
                style={{ margin: "0 .3em -0.4vh 0" }}
                className={styles.iconButton}
              />
              <span>Visualizer</span>
            </a>
          ) : (
            <a
              onClick={() => {
                toggleDropDown();
                handleBackgroundVideo();
              }}
            >
              <FaCompressArrowsAlt
                size={17}
                onClick={handleBackgroundVideo}
                style={{ margin: "0 .3em -0.4vh 0" }}
                className={styles.iconButton}
              />
              <span>Visualizer</span>
            </a>
          )}
        </div>
      )}
    </>
  );
}

export default MobileOption;
