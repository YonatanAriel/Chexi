import styles from './style.module.css';
import YouTube from 'react-youtube';
import React, {useContext, useEffect, useRef, useState} from 'react'
import { FaRegHeart, FaHeart, FaPlay, FaCompressArrowsAlt,FaExpandArrowsAlt } from 'react-icons/fa';
import {TbPlayerSkipForwardFilled, TbPlayerSkipBackFilled, TbPlayerPauseFilled} from 'react-icons/tb';
import {ImVolumeMute2, ImVolumeHigh} from 'react-icons/im';
import HandlePlayingSongContext from '../../contexts';
import {BsCameraVideoFill, BsFillCameraVideoOffFill} from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom';
import {TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti'
//GrSemantics (arrow up)

import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io'


// , isSongPlaying , setIsSongPlaying
function Footer({songPlayed, skipBackOrForward}){

   
    const {isSongPlaying, setIsSongPlaying} = useContext(HandlePlayingSongContext);
    // const playerRef = useRef(null);
    const playerRef = useRef(null);
    const [backgroundVideo, setBackgroundVideo] = useState(false)
    const [fullScreenVideo,setFullScreenVideo] = useState(false)
    // const [elapsedSeconds, setElapsedSeconds] = useState(0)
    // const [elapsedMinutes, setElapsedMinutes] = useState(0);
    // const [elapsedHours, setElapsedHours] = useState(0);
    const [volume, setVolume] = useState(50)
    const [showFooter , setShowFooter] = useState(true);

    const opts = {
        // height: '',
        // width: '',
        playerVars: {
          autoplay: 1,
          fs: 1,
          controls:0,
          disablekb: 1,
          modestbranding: 1,
          showinfo: 0,
          rel: 0,
          // origin: 'http://localhost:5174'
        }
    }
    
    
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
          } 
          else {
            playerRef.current.pauseVideo();
          }
          if (playerRef.current) {
          playerRef.current.setVolume(volume);
          }
        }
      }, [isSongPlaying, volume]);

    //   useEffect(() => { 
    //     const interval = setInterval(() => {
    //       if(isSongPlaying){ //למה לא עובד?
    //         setElapsedSeconds((prevS) => {
    //           if(elapsedMinutes === 59 && elapsedSeconds === 59){
    //             setElapsedHours((prev) => prev + 1)
    //             setElapsedMinutes(0)
    //             return 0
    //           }
    //           else if(prevS === 59){
    //             setElapsedMinutes((prevM) => prevM + 1)
    //             return 0
    //           }
    //           else{
    //             return prevS + 1
    //           }
    //           })
    //         }
    //     },1000)}
    // ,[])

     const handleBackgrundVideo = () => {
      setBackgroundVideo((prev) => !prev)
      {console.log(backgroundVideo)}
      
     }

     const handleVolumeChange = (e) => {
      const newVolume = Number(e.target.value)
      setVolume(newVolume)
     }
     const handleMute = () => {
      setVolume(0)
     }
     const handleUnmute = () => {
      setVolume(50)
     }
     //

    return <>
        <div  className={styles.videoContainer }  >
            <YouTube style={{display: location.pathname === "/Video" || backgroundVideo ? "block" : "none"}}
             videoId={songPlayed.id} opts={opts}
             autoplay onReady={(e) => (playerRef.current = e.target)}
              onEnd={() => {skipBackOrForward("forward")}} />
        </div>
        {/* <TiArrowSortedDown size={50}/> */}
    <div className={styles.arrowButton} style={{bottom: !showFooter && 0}} onClick={ () => setShowFooter(prev => !prev)}>
      {showFooter? (<IoIosArrowDown className={styles.blurIcon} size={41} />)
       : (<IoIosArrowUp className={styles.blurIcon} size={41} />)}
    </div>
 {showFooter && (<div className={styles.mainDiv}>
      <div className={styles.fullScreenButtons}>
        {location.pathname === "/Video"?
          ( <Link to={"/"} onClick={() => setFullScreenVideo(true)}>{<BsFillCameraVideoOffFill size={25} style={{marginLeft:"0.2vw"}} />}</Link> ) 
        : ( <Link to={"Video"} onClick={() => setFullScreenVideo(false)}>{<BsCameraVideoFill size={25} style={{marginLeft:"0.2vw"}}/>}</Link> )
        }
        {!backgroundVideo && <FaExpandArrowsAlt size={24} onClick={handleBackgrundVideo} className={styles.iconButton} />}
        {backgroundVideo && <FaCompressArrowsAlt size={24} onClick={handleBackgrundVideo} className={styles.iconButton} />}
      </div>
      {/*songPlayed.thumbnail.url */}
      <div className={styles.artistDetails}>
        <img src={songPlayed.channel.icon } onError={(e) => {
                  e.target.src =  songPlayed.thumbnail.url, console.log(e.target.src);}} />
        <span>{songPlayed.channel.name}</span>
      </div>
      <div className={styles.centerItemsContainer}>
        <div className={styles.palyingButtonsContainer}>
          <FaRegHeart className={`${styles.iconButton} ${styles.heart}`}/>    
          {/* <FaHeart /> */}
          <TbPlayerSkipBackFilled onClick={() => skipBackOrForward("back")} size={19} className={styles.iconButton} />
          {!isSongPlaying && <FaPlay className={`${styles.iconButton} ${styles.playAndPauseButton}`} onClick={handlePlay} size={30} />}
          {isSongPlaying && <TbPlayerPauseFilled className={`${styles.iconButton} ${styles.playAndPauseButton}`} onClick={handlePause} size={30}/>}
          <TbPlayerSkipForwardFilled onClick={() => skipBackOrForward("forward")} size={19} className={styles.iconButton}/>
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progressTime}>
            {/* <span >{(elapsedHours != 0) && (elapsedHours + ":")}{`${elapsedMinutes}:${elapsedSeconds}`}</span> */}
          </div>
          <input type="range" min="0" max="100"
          
          className={styles.progressInput}/>

          <span className={styles.progressTime}>{songPlayed.duration_formatted}</span>
        </div>
      </div>
      <div className={styles.volume}>
        {volume == 0 ? (<ImVolumeMute2 size={22} color="red" onClick={handleUnmute} className={styles.iconButton} />) : (<ImVolumeHigh size={22} onClick={handleMute} className={styles.iconButton}/>)}
        <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} className={styles.volumeInput} />
      </div>
    </div>)}
    </>
}
export default Footer

