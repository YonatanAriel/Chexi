import styles from "./style.module.css";
import YouTube from "react-youtube";
import { useContext, useEffect, useRef, useState, lazy, Suspense } from "react";
import {FaPlay, FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import {TbPlayerSkipForwardFilled, TbPlayerSkipBackFilled, TbPlayerPauseFilled} from "react-icons/tb";
import { ImVolumeMute2, ImVolumeHigh } from "react-icons/im";
import { BsCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import HandlePlayingSongContext from "../../../contexts/HandlePlayingSong";
import AddToPlaylist from "../AddToPlaylist";
import HandleFavoriteSong from "../../HandleFavoriteSong";
import ShowPopups from "../../../contexts/ShowPopups";
import Playlists from "../../../contexts/Playlists";
import Token from "../../../contexts/Token";

function Footer({backgroundVideo, setBackgroundVideo,}) {
  const {token} = useContext(Token)
  const {playedPlaylist} = useContext(Playlists)
  const {isSongPlaying, setIsSongPlaying, songs, songPlayed, skipBackOrForward} = useContext(HandlePlayingSongContext);
  const {showAddToPlaylistPopup, setShowAddToPlaylistPopup} = useContext(ShowPopups)
  const [setFullScreenVideo] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showFooter, setShowFooter] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [songProgress, setSongProgress] = useState(0);
  const navigate = useNavigate()
  const location = useLocation();
  const playerRef = useRef(null);
  const opts = {
    playerVars: {
      autoplay: 1,
      fs: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      Loop: 1
    },
  }

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
        const newMinutes = Math.floor(newCurrentTime / 60);
        const newSeconds = Math.floor(newCurrentTime % 60);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        if (e.data === window.YT.PlayerState.ENDED) {
          clearInterval(interval);
          setMinutes(0);
          setSeconds(0);
        }
      }, 1000);
    }
  };

  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    const duration = playerRef.current.getDuration();
    const seekTime = (progress / 100) * duration;
    playerRef.current.seekTo(seekTime);
    setSongProgress(progress);
  };
    
  const handlePause = () => {
    setIsSongPlaying(false);
  };

  const handlePlay = () => {
    setIsSongPlaying(true);
  };

  useEffect(() => {
    if (playerRef?.current) {
            playerRef.current?.playVideo();
          } else {
            playerRef.current?.pauseVideo();
          }
          if (playerRef?.current) {
            playerRef.current?.setVolume(volume);
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
  
  useEffect(() => {
    console.log("playerRef.current: ", playerRef.current);
  }, [playerRef]);

  return (
    <>
      <div className={styles.videoContainer}>
        <YouTube
          onStateChange={handlePlayerStateChange}
          style={{ display: location.pathname === "/Video" || backgroundVideo? "block" : "none",}}
          videoId={playedPlaylist? songPlayed?.videoId : songPlayed?.id}
          opts={opts}
          autoplay
          onReady={(e) => (playerRef.current = e.target)}
          onEnd={() => {
           playedPlaylist? skipBackOrForward("forward", playedPlaylist) : skipBackOrForward("forward", songs);
          }}
        />
      </div>
      <div className={`${styles.arrowButton} ${!showFooter && styles.arrowUpButton}`}
        onClick={() => setShowFooter((prev) => !prev)}
        >
        {showFooter ? (
          <IoIosArrowDown size={41} />
        ) : (
          <IoIosArrowUp size={64} />
        )}
      </div>
      {showFooter && (
        <div className={styles.mainDiv}>
          <div className={styles.fullScreenButtons}>
            {location.pathname === "/Video" ? (
              <Link 
               onClick={() => {
                setFullScreenVideo(true)
                navigate(-1)
                
              }}>
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
          <div className={styles.artistDetails}>
            <img 
            className={isSongPlaying? styles.spinImg : ""}
              src={playedPlaylist? (songPlayed?.channelImg) : (songPlayed?.channel?.icon)}
              onError={(e) => {
                (e.target.src = playedPlaylist? songPlayed?.songImg : songPlayed?.thumbnail?.url)
              }}
            />
            <span>{playedPlaylist? songPlayed?.channelName : songPlayed?.channel?.name}</span>
          </div>
          <div className={styles.centerItemsContainer}>
            <div className={styles.palyingButtonsContainer} >
              <HandleFavoriteSong />
              <TbPlayerSkipBackFilled
                onClick={() => {
                  playedPlaylist? skipBackOrForward("back", playedPlaylist) : skipBackOrForward("back", songs)}}
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
                onClick={() => {
                   playedPlaylist? skipBackOrForward("forward", playedPlaylist) : skipBackOrForward("forward", songs);}}
                size={19}
                className={styles.iconButton}
              />
              <div className={styles.AddToPlaylist}>
                <BsPlusCircle
                  onClick={() => {if(token) setShowAddToPlaylistPopup((prev) => !prev)}}
                  size={18}
                  className={`${styles.iconButton} ${styles.addToPlaylistButton}`}
                />
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div className={styles.progressTime}>
                {`${minutes.toString().padStart(2, "0")}:${seconds
                  .toString()
                  .padStart(2, "0")}`}{" "}
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
                {songPlayed?.duration_formatted}
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
      {showAddToPlaylistPopup && showFooter && <AddToPlaylist />}
    </>
  );
}
export default Footer;
