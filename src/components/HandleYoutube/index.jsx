// import styles from "./style.mpdule.css";

// function HandleYoutube({setMinutes, setSeconds, setSongProgress, songPlayed}) {
//     const opts = {
        // height: '',
        // width: '',
        // playerVars: {
        //   autoplay: 1,
        //   fs: 1,
        //   controls: 0,
        //   disablekb: 1,
        //   modestbranding: 1,
        //   showinfo: 0,
        //   rel: 0,
          // origin: 'http://localhost:5174'
    //     },
    //   };    
    // const handlePlayerStateChange = (e) => {
    //     if (e.data === window.YT.PlayerState.PLAYING) {
    //       setInterval(() => {
    //         const duration = playerRef.current.getDuration();
    //         const currentTime = playerRef.current.getCurrentTime();
    //         const progress = (currentTime / duration) * 100;
    //         setSongProgress(progress);
    //       }, 1000);
    //       const player = e.target;
    //       const interval = setInterval(() => {
    //         const newCurrentTime = player.getCurrentTime();
            // // console.log(newCurrentTime)
            // const newMinutes = Math.floor(newCurrentTime / 60);
            // const newSeconds = Math.floor(newCurrentTime % 60);
            // setMinutes(newMinutes);
            // setSeconds(newSeconds);
            // console.log(newCurrentTime)
//             if (e.data === window.YT.PlayerState.ENDED) {
//               clearInterval(interval);
//               setMinutes(0);
//               setSeconds(0);
//             }
//           }, 1000);
//         }
//     }

//     return <>      <div className={styles.videoContainer}>
//     <YouTube
//       onStateChange={handlePlayerStateChange}
//       style={{
//         display:
//           location.pathname === "/Video" || backgroundVideo
//             ? "block"
//             : "none",
//       }}
//       videoId={songPlayed.id}
//       opts={opts}
//       autoplay
//       onReady={(e) => (playerRef.current = e.target)}
//       onEnd={() => {
//         skipBackOrForward("forward");
//       }}
//     />
//   </div>
// </>
// }

// export default HandleYoutube;