import styles from "./style.module.css";
import YouTube from "react-youtube";
// import HandleYoutube from "../HandleYoutube/index";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaPlay,
  FaCompressArrowsAlt,
  FaExpandArrowsAlt,
} from "react-icons/fa";
import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
  TbPlayerPauseFilled,
} from "react-icons/tb";
import { ImVolumeMute2, ImVolumeHigh } from "react-icons/im";
import HandlePlayingSongContext from "../../../contexts/HandlePlayingSong";
import { BsCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
//GrSemantics (arrow up)
import AddToPlaylist from "../AddToPlaylist";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import HandleFavoriteSong from "../../HandleFavoriteSong";
import ShowPopups from "../../../contexts/ShowPopups";

// , isSongPlaying , setIsSongPlaying
function Footer({
  skipBackOrForward,
  backgroundVideo,
  setBackgroundVideo,
}) {
  const { isSongPlaying, setIsSongPlaying, songs, songPlayed} = useContext(HandlePlayingSongContext);
  // const playerRef = useRef(null);
  const playerRef = useRef(null);
  const [fullScreenVideo, setFullScreenVideo] = useState(false);
  // const [elapsedSeconds, setElapsedSeconds] = useState(0)
  // const [elapsedMinutes, setElapsedMinutes] = useState(0);
  // const [elapsedHours, setElapsedHours] = useState(0);
  const [volume, setVolume] = useState(50);
  const [showFooter, setShowFooter] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const {showAddToPlaylistPopup, setShowAddToPlaylistPopup} = useContext(ShowPopups)

  // useEffect(() => {
  //   if(seconds === 59){
  //     setSeconds(0)
  //     setMinutes(prev => prev + 1)
  //   }
  //   setSeconds(prev => prev + 1)
  // },[currentSeconds])
  const [songProgress, setSongProgress] = useState(0);
  // useEffect(() => console.log(newCurrentTime),[newCurrentTime])
  const handlePlayerStateChange = (e) => {
    if (e.data === window.YT.PlayerState.PLAYING) {
      setInterval(() => {
        const duration = playerRef.current.getDuration();
        const currentTime = playerRef.current.getCurrentTime();
        const progress = (currentTime / duration) * 100;
        setSongProgress(progress);
      }, 1000);
      const player = e.target;
      const interval = setInterval(() => {
        const newCurrentTime = player.getCurrentTime();
        // console.log(newCurrentTime)
        const newMinutes = Math.floor(newCurrentTime / 60);
        const newSeconds = Math.floor(newCurrentTime % 60);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        // console.log(newCurrentTime)
        if (e.data === window.YT.PlayerState.ENDED) {
          clearInterval(interval);
          setMinutes(0);
          setSeconds(0);
        }
      }, 1000);
      //  else if (e.data === window.YT.PlayerState.PAUSED) {
      // }
    }
  };
  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    const duration = playerRef.current.getDuration();
    const seekTime = (progress / 100) * duration;
    playerRef.current.seekTo(seekTime);
    setSongProgress(progress);
  };

  // const handlePlayerStateChange = (e) => {
  //     if (e.data === window.YT.PlayerState.PLAYING) {
  //       setInterval(() => {
  //         setSeconds(prev => prev + 1)
  //         if(seconds == 59){
  //           setMinutes(prev => prev + 1)
  //           setSeconds(0)
  //         }
  //       }, 1000);
  //       if(e.data === window.YT.PlayerState.ENDED){
  //               setMinutes(0)
  //               setSeconds(0)
  //       }
  //     }
  //   }

  const opts = {
    // height: '',
    // width: '',
    playerVars: {
      autoplay: 1,
      fs: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      // origin: 'http://localhost:5174'
    },
  };
  const location = useLocation();
  const handlePause = () => {
    setIsSongPlaying(false);
  };

  const handlePlay = () => {
    setIsSongPlaying(true);
  };

  useEffect(() => {
    if (playerRef.current) {
      if (isSongPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
      if (playerRef.current) {
        playerRef.current.setVolume(volume);
      }
    }
  }, [isSongPlaying, volume]);

  const handleBackgrundVideo = () => {
    setBackgroundVideo((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };
  const handleMute = () => {
    setVolume(0);
  };
  const handleUnmute = () => {
    setVolume(50);
  };
  //

  return (
    <>
      {/* <HandleYoutube setMinutes={setMinutes} setSeconds={setSeconds} 
      setSongProgress={setSongProgress} songPlayed={songPlayed} /> */}
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          zIndex: 400,
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "1px solid red",
        }}
      ></div>
      <div className={styles.videoContainer}>
        <YouTube
          onStateChange={handlePlayerStateChange}
          style={{
            display:
              location.pathname === "/Video" || backgroundVideo
                ? "block"
                : "none",
          }}
          videoId={songPlayed.id}
          opts={opts}
          autoplay
          onReady={(e) => (playerRef.current = e.target)}
          onEnd={() => {
            skipBackOrForward("forward");
          }}
        />
      </div>

      {/* <TiArrowSortedDown size={50}/> */}
      <div
        className={`${styles.arrowButton} ${
          !showFooter && styles.arrowUpButton
        }`}
        onClick={() => setShowFooter((prev) => !prev)}
      >
        {showFooter ? (
          <IoIosArrowDown className={styles.blurIcon} size={41} />
        ) : (
          <IoIosArrowUp className={styles.blurIcon} size={41} />
        )}
      </div>
      {showFooter && (
        <div className={styles.mainDiv}>
          <div className={styles.fullScreenButtons}>
            {location.pathname === "/Video" ? (
              <Link to={"/"} onClick={() => setFullScreenVideo(true)}>
                {
                  <BsFillCameraVideoOffFill
                    size={25}
                    style={{ marginLeft: "0.2vw" }}
                  />
                }
              </Link>
            ) : (
              <Link to={"Video"} onClick={() => setFullScreenVideo(false)}>
                {
                  <BsCameraVideoFill
                    size={25}
                    style={{ marginLeft: "0.2vw" }}
                  />
                }
              </Link>
            )}
            {!backgroundVideo && (
              <FaExpandArrowsAlt
                size={24}
                onClick={handleBackgrundVideo}
                className={styles.iconButton}
              />
            )}
            {backgroundVideo && (
              <FaCompressArrowsAlt
                size={24}
                onClick={handleBackgrundVideo}
                className={styles.iconButton}
              />
            )}
          </div>
          {/*songPlayed.thumbnail.url */}
          <div className={styles.artistDetails}>
            <img
              src={songPlayed.channel.icon}
              onError={(e) => {
                (e.target.src = songPlayed.thumbnail.url),
                  console.log(e.target.src);
              }}
            />
            <span>{songPlayed.channel.name}</span>
          </div>
          <div className={styles.centerItemsContainer}>
            <div className={styles.palyingButtonsContainer} >
              <HandleFavoriteSong />
               {/* <FaRegHeart
                size={18}
                className={`${styles.iconButton} ${styles.heart}`}
              />
               <FaHeart size={18} style={{color:"red"}}/>  */}
              <TbPlayerSkipBackFilled
                onClick={() => skipBackOrForward("back")}
                size={19}
                className={styles.iconButton}
              />
              {!isSongPlaying && (
                <FaPlay
                  className={`${styles.iconButton} ${styles.playAndPauseButton}`}
                  onClick={handlePlay}
                  size={30}
                />
              )}
              {isSongPlaying && (
                <TbPlayerPauseFilled
                  className={`${styles.iconButton} ${styles.playAndPauseButton}`}
                  onClick={handlePause}
                  size={30}
                />
              )}
              <TbPlayerSkipForwardFilled
                onClick={() => skipBackOrForward("forward")}
                size={19}
                className={styles.iconButton}
              />
              <div className={styles.AddToPlaylist}>
                <BsPlusCircle
                  onClick={() => setShowAddToPlaylistPopup((prev) => !prev)}
                  size={18}
                  className={`${styles.iconButton} ${styles.addToPlaylistButton}`}
                />
                {/* <BsPlusCircleFill size={19} className={styles.iconButton} /> */}
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div className={styles.progressTime}>
                {`${minutes.toString().padStart(2, "0")}:${seconds
                  .toString()
                  .padStart(2, "0")}`}{" "}
                {/* <span >{(elapsedHours != 0) && (elapsedHours + ":")}{`${elapsedMinutes}:${elapsedSeconds}`}</span> */}
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={songProgress}
                onChange={handleProgressChange}
                className={styles.progressInput}
              />
              <span className={styles.progressTime}>
                {songPlayed.duration_formatted}
              </span>
            </div>
          </div>
          <div className={styles.volume}>
            {volume == 0 ? (
              <ImVolumeMute2
                size={22}
                color="red"
                onClick={handleUnmute}
                className={styles.iconButton}
              />
            ) : (
              <ImVolumeHigh
                size={22}
                onClick={handleMute}
                className={styles.volumeHighButton}
              />
            )}
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className={styles.volumeInput}
            />
          </div>
        </div>
      )}
      {showAddToPlaylistPopup && showFooter && <AddToPlaylist setShowAddToPlaylistPopup={setShowAddToPlaylistPopup} />}
    </>
  );
}
export default Footer;
