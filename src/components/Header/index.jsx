import styles from "./style.module.css";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiLogin, HiLogout } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { MdAssignmentInd } from "react-icons/md";
import { BsMusicNote } from "react-icons/bs";
import { IoLibrary } from "react-icons/io5";
import Search from "../Search";
import Token from "../../contexts/Token";
import Playlists from "../../contexts/Playlists";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import MobileOption from "../MobileOption";

function Header({
  setUserSearch,
  isLibraryOpen,
  setIsLibraryOpen,
  backgroundVideo,
  screenWidth,
  libraryWidth,
  handleLogout
}) {
  const location = useLocation().pathname;
  const changeStyleForLibrary =
    ["/LikedSongs", "/Playlists", "/FavoriteArtists"].includes(location) ||
    isLibraryOpen;
  const { token, setToken } = useContext(Token);
  const { setSongs, setSongPlayed } = useContext(HandlePlayingSongContext);
  const { setPlaylists, setLikedSongsPlaylist } = useContext(Playlists);
  const headerWidth = screenWidth < 1024? "100vw" : (changeStyleForLibrary? `calc(100vw - ${ libraryWidth})` : (screenWidth > 1024? "calc(100vw - 164px)" : "100vw"));
  const showLogoutCondition = "";
  // const handleLogout = () => {
  //   localStorage.setItem("token", null);
  //               setSongs(null),
  //               setSongPlayed(null);
  //               setLikedSongsPlaylist(null);
  //               setPlaylists(null);
  //               setToken(null);
  //               setUserSearch("dua Lipa")
  // }

  return (
    <>
      <div
        className={`${styles.logoBackground} ${
          changeStyleForLibrary && !backgroundVideo
            ? styles.IncreaseLogoPadding
            : ""
        }`}
      >
        <BsMusicNote style={{ marginBottom: "8px" }} size={55} />
        <span className={styles.logoText}>Chexi</span>
      </div>
      <div
        className={`${styles.mainDiv} ${
          changeStyleForLibrary ? styles.libraryOpenMainDiv : ""
        }`}
        style={{width: headerWidth,
        left: screenWidth < 1024? 0 : (libraryWidth === 0? (screenWidth > 1024? "164px" : 0) : libraryWidth)
      }}
      >
        <div className={styles.home_library_search}>
          {((screenWidth < 768 && 
          location !== "/") 
          || (screenWidth > 768)) 
          && 
          (<Link className={styles.home} to="./">
            <AiFillHome style={{ marginBottom: "-1px" }} size={17} />
            <span>Home</span>
          </Link>)
}
          {!["/LikedSongs", "/Playlists", "/FavoriteArtists", `${screenWidth < 700 && "/Video"}`].includes(location) && (
            <a onClick={() => setIsLibraryOpen((prev) => !prev)}>
              <IoLibrary size={17} style={{ margin: "0 0.1vw -0.2vh 0" }} />
              Library
            </a>
          )}
          <Search setUserSearch={setUserSearch} screenWidth={screenWidth} />
        </div>
        <div className={styles.signAndLogDIv}>
        {/* || !(screenWidth < 700 && "/Video" == location)) */}
          {(token && screenWidth > 513 )? (
            <Link
              to="/"
              onClick={handleLogout}
            >
              <HiLogout size={19} style={{ marginBottom: "-0.6vh" }} />
              <span>Log out</span>
            </Link>
          ) : (
            screenWidth > 513 &&
             (<Link to="./Login">
              <HiLogin size={19} style={{ marginBottom: "-0.6vh" }} />
              <span>Log In</span>
            </Link>)
          )}
          {(!token && screenWidth > 513) && (
            <Link to="./SignUp">
              <MdAssignmentInd style={{ marginBottom: "-0.3vh" }} />
              <span>Sign Up</span>
            </Link>
          )}
          {screenWidth < 513  && <MobileOption handleLogout={handleLogout} />}
        </div>
      </div>
    </>
  );
}

export default Header;
