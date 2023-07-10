import { BsPlayCircleFill } from "react-icons/bs";
import styles from "./style.module.css";
import { GiLouvrePyramid } from "react-icons/gi";
import { lazy, useContext, useEffect, useState } from "react";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import { FireworkSpinner, WaveSpinner } from "react-spinners-kit";
import Playlist from "../../components/playlist";
import Playlists from "../../contexts/Playlists";

// ,setIsSongPlaying

function Home({
  isLibraryOpen,
  backgroundVideo,
}) {
  const { isSongPlaying, setIsSongPlaying, songPlayed, setSongPlayed, songs } = useContext(
    HandlePlayingSongContext
  );
  const {setPlayedPlaylist} = useContext(Playlists)
  const [imagesErrorCount, setImagesErrorCount] = useState(0);
  const [songDivHeight, setSongDivHeight] = useState("50.3vh");
  const [imgHeight, setImgHeight] = useState("15vw");
  const [loadedImages, setLoadedImages] = useState(0);
  const [loadRemainingImgs, setloadRemainingImgs] = useState(false);
  const handleLoadingImgs = () => {
    setLoadedImages((prev) => prev + 1);
  };
  useEffect(() => {
    loadedImages === 10 && setloadRemainingImgs(true), [loadedImages];
  });
  useEffect(() => console.log(songs),[songs])

  useEffect(() => {
    setImagesErrorCount(0);
  }, [songs]);
  useEffect(() => {
    if (imagesErrorCount === songs?.length) {
      setSongDivHeight("36vh");
      setImgHeight("8.415vw");
    } else {
      setSongDivHeight("50.3vh");
      setImgHeight("15vw");
    }
  }, [imagesErrorCount, songs?.length, songs]);
  //  const songDiv = e.target.parentNode.parentNode;
  // if(imagesErrorCount === songs.length){
  //  e.target.style.height = "8.415vw", songDiv.style.height = '36vh'}
  //  }

  return (
    <>
      {/* {width: isLibraryOpen? "78.5vw" : "98.5vw"} */}
      <div
        style={{ width: isLibraryOpen ? "80vw" : "100vw" }}
        className={styles.mainDiv}
      >
        {songs?.length > 0 ? (
          songs.map((song, i) => (
            // ${backgroundVideo && styles.backgroundVideo}
            <div
              className={`${styles.song} `}
              style={{
                height: songDivHeight,
                cursor: songPlayed !== song && "pointer",
              }}
              onClick={() => {
                setPlayedPlaylist(null), setSongPlayed(song), setIsSongPlaying(true);
              }}
              key={i}
            >
              <div className={styles.imgAndButton}>
                {/* song.channel.icon */}
                <img
                  key={song?.thumbnail?.id}
                  className={styles.songImg}
                  src={song?.channel?.icon}
                  style={{ height: imgHeight }}
                  loading={
                    i < 10 ? "lazy" : loadRemainingImgs ? "eager" : "lazy"
                  }
                  onError={(e) => {
                    e.target.src = song.thumbnail.url;
                    setImagesErrorCount((prev) => prev + 1);
                  }}
                  alt={song.title}
                  onLoad={i < 10 ? handleLoadingImgs : undefined}
                />
                {songPlayed == song && isSongPlaying ? (
                  <div className={styles.songButtonOrAnima}>
                    <WaveSpinner size={95} />
                  </div>
                ) : (
                  <BsPlayCircleFill className={styles.songButton} size={40} />
                )}
              </div>
              <h3>
                {song.title
                  .split(/[\(\[]/)[0]
                  .trim()
                  .replace(/(.*)\s*-\s*(.*)/, "$2\n$1")
                  .trim()
                  .slice(0, 50)}
              </h3>
            </div> /*song.channel.icon? song.channel.icon : song.thumbnail.url*/
          ))
        ) : (
          <div
            className={styles.loading}
            style={{ width: isLibraryOpen ? "78.5vw" : "100vw" }}
          >
            <FireworkSpinner color="wheat" size={200} />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
// .channel.icon / thumbnail.url
//song.title.split(/[\(\[]/)[0].trim().slice(0,65).replace(/ ?- ?/g, "\n")
