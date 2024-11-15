import styles from "./style.module.css";
import YouTube from "react-youtube";
import { useContext, useEffect, useRef, useState } from "react";
import { FaPlay, FaExpandArrowsAlt } from "react-icons/fa";
import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
  TbPlayerPauseFilled,
} from "react-icons/tb";
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
import VisualizerButtonOff from "./VisualizerButtonOff";
import Tooltip from "../tooltip";
import VisualizerButtonOn from "./VisualizerButtonOn";

function Footer({ backgroundVideo, setBackgroundVideo, screenWidth }) {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const { token } = useContext(Token);
  const { playedPlaylist } = useContext(Playlists);
  const {
    isSongPlaying,
    setIsSongPlaying,
    songs,
    songPlayed,
    skipBackOrForward,
    isPlayerLoading,
    setIsPlayerLoading,
  } = useContext(HandlePlayingSongContext);
  const { showAddToPlaylistPopup, setShowAddToPlaylistPopup } =
    useContext(ShowPopups);
  const [volume, setVolume] = useState(50);
  const [showFooter, setShowFooter] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [songProgress, setSongProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const [skipDisabled, setSkipDisabled] = useState(false);
  const opts = {
    playerVars: {
      autoplay: 1,
      fs: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      Loop: 1,
    },
  };

  const isPlayerFullyReady = () => {
    try {
      return (
        playerRef.current &&
        playerRef.current?.h &&
        playerRef.current?.g &&
        typeof playerRef.current.getCurrentTime === "function" &&
        typeof playerRef.current.getPlayerState === "function"
      );
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    setIsPlayerLoading(true);
  }, []);

  const disableSkip = () => {
    setSkipDisabled(true);
    setTimeout(() => {
      setSkipDisabled(false);
    }, [1200]);
  };

  const handlePlayerStateChange = (e) => {
    //new version
    if (!isPlayerFullyReady()) return;
    //

    const PLAYING = 1;
    const PAUSED = 2;
    if (e.data === PLAYING || e.data === PAUSED) {
      setIsPlayerLoading(false);
    } else {
      setIsPlayerLoading(true);
    }
    let interval;
    const handleSongEnd = () => {
      clearInterval(interval);
      setMinutes(0);
      setSeconds(0);
    };
    if (e.data === window.YT.PlayerState.PLAYING) {
      interval = setInterval(() => {
        //new version
        if (!isPlayerFullyReady()) {
          clearInterval(interval);
          return;
        }
        //

        const duration = playerRef?.current?.getDuration();
        const currentTime = playerRef?.current?.getCurrentTime();
        const progress = (currentTime / duration) * 100;
        setSongProgress(progress);
        const player = e.target;
        const newCurrentTime = player?.getCurrentTime();
        const newMinutes = Math.floor(newCurrentTime / 60);
        const newSeconds = Math.floor(newCurrentTime % 60);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        if (currentTime >= duration) {
          handleSongEnd();
        }
      }, 1000);
    } else {
      clearInterval(interval);
      setMinutes(0);
      setSeconds(0);
    }
  };

  const handleProgressChange = (e) => {
    //new version
    if (!isPlayerFullyReady()) return;
    //
    try {
      const progress = parseInt(e.target.value);
      const duration = playerRef.current.getDuration();
      const seekTime = (progress / 100) * duration;
      playerRef.current.seekTo(seekTime);
      setSongProgress(progress);
    } catch (e) {
      console.error("Error changing progress:", e);
    }
  };

  const handlePause = () => {
    if (isPlayerLoading) return;
    setIsSongPlaying(false);
  };

  const handlePlay = () => {
    if (isPlayerLoading) return;
    setIsSongPlaying(true);
  };

  useEffect(() => {
    // if (isPlayerReady) { old version
    if (isPlayerReady && isPlayerFullyReady()) {
      try {
        if (playerRef?.current) {
          playerRef.current?.setVolume(volume);
          if (isSongPlaying) {
            playerRef.current?.playVideo();
          } else {
            playerRef.current?.pauseVideo();
          }
        }
      } catch (e) {
        console.error("Player operation failed:", e);
      }
    }
  }, [isSongPlaying, volume, songPlayed]);

  const handleBackgroundVideo = () => {
    setBackgroundVideo((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    if (isPlayerReady) setVolume(newVolume);
  };

  const handleMute = () => {
    setVolume(0);
  };

  const handleUnmute = () => {
    setVolume(50);
  };

  return (
    <>
      <div className={styles.videoContainer}>
        <YouTube
          onStateChange={handlePlayerStateChange}
          style={{
            display:
              location.pathname === "/Video" || backgroundVideo
                ? "block"
                : "none",
          }}
          // videoId={playedPlaylist ? songPlayed?.videoId : songPlayed?.id} old api
          videoId={songPlayed?.videoId}
          opts={opts}
          autoplay
          onReady={(e) => {
            playerRef.current = e.target;
            setMinutes(0);
            setSeconds(0);
            setIsPlayerReady(true);
          }}
          onEnd={() => {
            //new version
            if (!isPlayerFullyReady()) return;
            //

            playedPlaylist
              ? skipBackOrForward("forward", playedPlaylist)
              : skipBackOrForward("forward", songs);
            setMinutes(0);
            setSeconds(0);
          }}
          onError={(e) => {
            console.error("YouTube player error:", e);
          }}
        />
      </div>
      <div
        className={`${styles.arrowButton} ${
          !showFooter && styles.arrowUpButton
        }`}
        onClick={() => setShowFooter((prev) => !prev)}
      >
        {showFooter ? <IoIosArrowDown size={41} /> : <IoIosArrowUp size={64} />}
      </div>
      {showFooter && (
        <div className={styles.mainDiv}>
          <div className={styles.fullScreenButtons}>
            {location.pathname === "/Video" ? (
              <Link
                onClick={() => {
                  navigate(-1);
                }}
              >
                {
                  <BsFillCameraVideoOffFill
                    size={25}
                    style={{ marginLeft: "0.2vw" }}
                  />
                }
              </Link>
            ) : (
              <Link to={"Video"}>
                {
                  <BsCameraVideoFill
                    size={25}
                    style={{
                      display: screenWidth < 513 && "none",
                      marginLeft: "0.2vw",
                    }}
                  />
                }
              </Link>
            )}
            {!backgroundVideo && (
              <Tooltip content="Visualizer" marginLeft={true}>
                <VisualizerButtonOn
                  screenWidth={screenWidth}
                  handleBackgroundVideo={handleBackgroundVideo}
                />
              </Tooltip>
            )}
            {backgroundVideo && (
              <Tooltip content="Visualizer" marginLeft={true}>
                <VisualizerButtonOff
                  handleBackgroundVideo={handleBackgroundVideo}
                  screenWidth={screenWidth}
                />
              </Tooltip>
            )}
          </div>
          <div className={styles.artistDetails}>
            <img
              className={isSongPlaying ? styles.spinImg : ""}
              src={
                // playedPlaylist  old api
                //   ? songPlayed?.channelImg
                //   : songPlayed?.channel?.icon

                playedPlaylist
                  ? songPlayed?.channelImg
                  : songPlayed?.thumbnail[0]?.url
              }
              onError={(e) => {
                // e.target.src = playedPlaylist   old api
                //   ? songPlayed?.songImg
                //   : songPlayed?.thumbnail?.url;
                e.target.src = playedPlaylist
                  ? songPlayed?.songImg
                  : songPlayed?.thumbnail[1]?.url;
              }}
            />
            <span>
              {
                // playedPlaylist   old api
                //   ? songPlayed?.channelName
                //   : songPlayed?.channel?.name
                playedPlaylist
                  ? songPlayed?.channelName
                  : songPlayed?.channelTitle
              }
            </span>
          </div>
          <div className={styles.centerItemsContainer}>
            <div className={styles.palyingButtonsContainer}>
              <HandleFavoriteSong screenWidth={screenWidth} />
              <TbPlayerSkipBackFilled
                onClick={() => {
                  if (skipDisabled || isPlayerLoading) return;
                  disableSkip();
                  playedPlaylist
                    ? skipBackOrForward("back", playedPlaylist)
                    : skipBackOrForward("back", songs);
                }}
                size={screenWidth > 500 ? 19 : 35}
                className={styles.iconButton}
                style={{
                  cursor:
                    skipDisabled || isPlayerLoading ? "default" : "pointer",
                }}
              />
              {!isSongPlaying && (
                <FaPlay
                  className={`${styles.iconButton} ${styles.playAndPauseButton}`}
                  onClick={handlePlay}
                  size={screenWidth > 500 ? 30 : 40}
                  style={{
                    cursor: isPlayerLoading ? "default" : "pointer",
                  }}
                />
              )}
              {isSongPlaying && (
                <TbPlayerPauseFilled
                  className={`${styles.iconButton} ${styles.playAndPauseButton}`}
                  onClick={handlePause}
                  size={screenWidth > 500 ? 30 : 40}
                  style={{
                    cursor: isPlayerLoading ? "default" : "pointer",
                  }}
                />
              )}
              <TbPlayerSkipForwardFilled
                onClick={() => {
                  if (skipDisabled || isPlayerLoading) return;
                  disableSkip();
                  playedPlaylist
                    ? skipBackOrForward("forward", playedPlaylist)
                    : skipBackOrForward("forward", songs);
                }}
                size={screenWidth > 500 ? 19 : 35}
                className={styles.iconButton}
                style={{
                  cursor:
                    skipDisabled || isPlayerLoading ? "default" : "pointer",
                }}
              />
              <div className={styles.AddToPlaylist}>
                <BsPlusCircle
                  onClick={() => {
                    if (token) setShowAddToPlaylistPopup((prev) => !prev);
                  }}
                  size={19}
                  className={`${styles.iconButton} ${styles.addToPlaylistButton}`}
                />
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div className={styles.progressTime}>
                {`${minutes.toString().padStart(2, "0")}:${seconds
                  .toString()
                  .padStart(2, "0")}`}
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
