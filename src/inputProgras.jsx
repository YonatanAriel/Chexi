const [songProgress, setSongProgress] = useState(0);
const handlePlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      // Song is playing, update the song progress
      const duration = playerRef.current.getDuration();
      const currentTime = playerRef.current.getCurrentTime();
      const progress = (currentTime / duration) * 100;
      setSongProgress(progress);
    }
  };

  events: {
    onStateChange: handlePlayerStateChange
  }

  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    const duration = playerRef.current.getDuration();
    const seekTime = (progress / 100) * duration;
    playerRef.current.seekTo(seekTime);
    setSongProgress(progress);
  };

  <input type="range" min="0" max="100"
  value={songProgress}
  onChange={handleProgressChange}
  className={styles.progressInput}/>
