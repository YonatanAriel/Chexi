import styles from './style.module.css';
import YouTube from 'react-youtube';
import React, {useEffect, useRef} from 'react'
import { FaRegHeart, FaHeart, FaPlay } from 'react-icons/fa';
import {TbPlayerSkipForwardFilled, TbPlayerSkipBackFilled, TbPlayerPauseFilled} from 'react-icons/tb';
import {ImVolumeMute2, ImVolumeHigh, ImVolumeMedium, ImVolumeLow} from 'react-icons/im';
function Footer({songPlayed, isSongPlaying, setIsSongPlaying}){
    const playerRef = useRef(null);
    const opts = {
        height: '',
        width: '',
        playerVars: {
          autoplay: 1,
          fs: 1,
          controls:0,
          disablekb: 1,
          modestbranding: 1,
          showinfo: 0,
        }
    }
    const handlePause = () => {
        setIsSongPlaying(false);
        if (playerRef.current) {
            playerRef.current.pauseVideo();
          }
      };
      
      const handlePlay = () => {
        setIsSongPlaying(true);
        if (playerRef.current) {
            playerRef.current.playVideo();
          }
      };
      useEffect(() => {
        if (playerRef.current) {
          if (isSongPlaying) {
            playerRef.current.playVideo();
          } else {
            playerRef.current.pauseVideo();
          }
        }
      }, [isSongPlaying]);
    return <>
    <div className={styles.sticky}>
        <div className={styles.videoContainer}>
            <YouTube videoId={songPlayed.id} opts={opts} autoplay onReady={(event) => (playerRef.current = event.target)}  />
        </div>
    </div>
    <div className={styles.mainDiv}>
    <FaRegHeart />
    <FaHeart />
    <p>0:34</p>
    <TbPlayerSkipBackFilled />
    {!isSongPlaying && <FaPlay onClick={handlePlay} size={30} />}
    {isSongPlaying && <TbPlayerPauseFilled  onClick={handlePause} size={30}/>}
    <TbPlayerSkipForwardFilled />
    <p>{songPlayed.duration_formatted}</p>
    <ImVolumeMute2 /><ImVolumeHigh /><ImVolumeMedium /><ImVolumeLow />
    <input type="range" /> 
    </div>
    </>
}
export default Footer

// (songPlayed.duration / 60).toFixed(2).replace(".",":")
// useEffect(() => {
//   if (isSongPlaying) {
//     audioRef.current.play(); // Start playing the audio
//   } else {
//     audioRef.current.pause(); // Pause the audio
//   }
// }, [isSongPlaying,songPlayed]);
// const audioRef = useRef();
// const handlePlay = () => {
// setIsSongPlaying(true);
// audioRef.current.play();
// };
// const handlePause = () => {
// setIsSongPlaying(false);
// audioRef.current.pause();
// };
