import styles from "./style.module.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import {  WaveSpinner } from "react-spinners-kit";
import Playlists from "../../contexts/Playlists";
import Loading from "../../components/Loading";


function Home({isLibraryOpen, screenWidth}) {

  const { isSongPlaying, setIsSongPlaying, songPlayed, setSongPlayed, songs, setSongs } = useContext(
    HandlePlayingSongContext
  );
  const [searchSongs, setSearchSongs] = useState()
  const {setPlayedPlaylist, playedPlaylist} = useContext(Playlists)
  const [imagesErrorCount, setImagesErrorCount] = useState(0);
  const [songDivHeight, setSongDivHeight] = useState("50.3vh");
  const [imgHeight, setImgHeight] = useState("15vw");
  const [loadedImages, setLoadedImages] = useState(0);
  const [loadRemainingImgs, setloadRemainingImgs] = useState(false);
  const condition = songPlayed && songPlayed[playedPlaylist? "videoId" : "id"]

  useEffect(() =>  {
    const storedSearchSongs = localStorage.getItem("searchSongs");
    if (storedSearchSongs) {
      try {
        setSearchSongs(JSON.parse(storedSearchSongs));
      } catch (error) {
      }
    }  }
    ,[songs])

  const handleLoadingImgs = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    loadedImages === 10 && setloadRemainingImgs(true), [loadedImages];
  });

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

  return (
    <>
      <div
        className={`${styles.mainDiv} ${isLibraryOpen? styles.decreaseMainDivWidth : ""}`}
      >
        {songs?.length > 0 ? (
          searchSongs?.map((song, i) => (
            <div
              className={`${styles.song} `}
              style={{
                height: songDivHeight,
                cursor: condition !== song.id && "pointer"
              }}
              onClick={() => {
                setPlayedPlaylist(null), setSongPlayed(song), setIsSongPlaying(true), setSongs(searchSongs);
              }}
              key={i}
            >
              <div className={styles.imgAndButton}>
                <img
                  key={song?.thumbnail?.id}
                  className={styles.songImg}
                  src={song?.channel?.icon}
                  // style={{ height: imgHeight }}
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
                {condition === song.id && isSongPlaying ? (
                  <div className={styles.WaveSpinner}>
                    <WaveSpinner color={"wheat"} size={screenWidth > 1024? 95 : screenWidth > 900? 70: screenWidth > 768? 60 : 50} />
                  </div>
                ) : (
                  <BsPlayCircleFill className={styles.songButton} size={40} />
                )}
              </div>
              <h3 className={styles.songTitle}>
                {song.title
                  .split(/[\(\[]/)[0]
                  .trim()
                  .replace(/(.*)\s*-\s*(.*)/, "$2\n$1")
                  .trim()
                  .slice(0, 50)}
              </h3>
            </div> 
          ))
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default Home;
