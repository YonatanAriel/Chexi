import styles from './style.module.css';
import YouTube from 'react-youtube';
import React, {useEffect, useRef} from 'react'
import { FaRegHeart, FaHeart, FaPlay } from 'react-icons/fa';
import {TbPlayerSkipForwardFilled, TbPlayerSkipBackFilled, TbPlayerPauseFilled} from 'react-icons/tb';
import {ImVolumeMute2, ImVolumeHigh, ImVolumeMedium, ImVolumeLow} from 'react-icons/im';
function Footer({songPlayed, isSongPlaying, setIsSongPlaying}){
  const audioRef = useRef();
    useEffect(() => {
        if (isSongPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }, [isSongPlaying,songPlayed]);
    const handlePlay = () => {
    setIsSongPlaying(true);
    audioRef.current.play();
  };
  const handlePause = () => {
    setIsSongPlaying(false);
    audioRef.current.pause();
  };
  const playerOptions = {
    playerVars: {
      controls: 0, // Hide video controls
    },
  };
    return <>
    <YouTube videoId={songPlayed.id} opts={playerOptions} />
    <div className={styles.mainDiv}>
    <FaRegHeart />
    <FaHeart />
    <p>0:34</p>
    <TbPlayerSkipBackFilled />
    {!isSongPlaying && <FaPlay onClick={handlePlay} size={30} />}
    {isSongPlaying && <TbPlayerPauseFilled onClick={handlePause} /*onClick={() => setIsSongPlaying(false)}*/ size={30}/>}
    <TbPlayerSkipForwardFilled />
    <p>{songPlayed.duration_formatted}</p>
    <ImVolumeMute2 /><ImVolumeHigh /><ImVolumeMedium /><ImVolumeLow />
    <input type="range" /> 
    <audio autoPlay ref={audioRef} src={songPlayed.url} />
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
