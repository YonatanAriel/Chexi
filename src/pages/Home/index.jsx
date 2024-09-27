import styles from "./style.module.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import { WaveSpinner } from "react-spinners-kit";
import Playlists from "../../contexts/Playlists";
import Loading from "../../components/Loading";
import { useLocation } from "react-router-dom";

function Home({ isLibraryOpen, screenWidth, libraryWidth }) {
  const {
    isSongPlaying,
    setIsSongPlaying,
    songPlayed,
    setSongPlayed,
    songs,
    setSongs,
  } = useContext(HandlePlayingSongContext);
  const [searchSongs, setSearchSongs] = useState();
  const { setPlayedPlaylist, playedPlaylist } = useContext(Playlists);
  const [imagesErrorCount, setImagesErrorCount] = useState(0);
  const [songDivHeight, setSongDivHeight] = useState("52.3vh");
  const [imgHeight, setImgHeight] = useState("15vw");
  const [loadedImages, setLoadedImages] = useState(0);
  const [loadRemainingImgs, setloadRemainingImgs] = useState(false);
  // const condition = songPlayed && songPlayed[playedPlaylist ? "videoId" : "id"]; old api
  const condition = songPlayed && songPlayed["videoId"];
  const [hoveredSong, setHoveredSong] = useState(null);
  const [hasVisited, setHasVisited] = useState(false);
  const location = useLocation();
  const containerWidth =
    !isLibraryOpen || screenWidth < 513
      ? "100vw"
      : `calc(100vw - ${libraryWidth})`;

  useEffect(() => {
    const storedSearchSongs = localStorage.getItem("searchSongs");
    if (storedSearchSongs) {
      try {
        setSearchSongs(JSON.parse(storedSearchSongs));
      } catch (error) {
        console.log(error);
      }
    }
  }, [songs]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const playSong = params.get("playSong") === "true";

    if (playSong && searchSongs && !hasVisited) {
      setSongPlayed(searchSongs[2]);

      // setIsSongPlaying(true);
      setSongs(searchSongs);
      setPlayedPlaylist(null);
      setHasVisited(true);
    }
  }, [location.search, searchSongs]);

  useEffect(() => {
    const storedSearchSongs = localStorage.getItem("searchSongs");
    if (storedSearchSongs) {
      try {
        setSearchSongs(JSON.parse(storedSearchSongs));
      } catch (error) {
        console.log(error);
      }
    }
  }, [songs]);

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
      setSongDivHeight("52.3vh");
      setImgHeight("15vw");
    }
  }, [imagesErrorCount, songs?.length, songs]);

  return (
    <>
      <div
        className={`${styles.mainDiv} ${
          isLibraryOpen ? styles.decreaseMainDivWidth : ""
        }`}
        style={{ width: containerWidth }}
      >
        {songs?.length > 0 ? (
          searchSongs?.map((song, i) => (
            <div
              className={`${styles.song} `}
              style={{
                height: songDivHeight,
                cursor: condition !== song.id && "pointer",
              }}
              onClick={() => {
                setPlayedPlaylist(null),
                  setSongPlayed(song),
                  setIsSongPlaying(true),
                  setSongs(searchSongs);
              }}
              key={i}
              onMouseEnter={() => setHoveredSong(i)}
              onMouseLeave={() => setHoveredSong(null)}
            >
              <div className={styles.imgAndButton}>
                <img
                  // key={song?.thumbnail?.id} old api
                  key={song?.thumbnail[0]?.url}
                  className={styles.songImg}
                  // src={song?.channel?.icon} old api
                  src={
                    !song?.richThumbnail
                      ? song?.thumbnail[0]?.url
                      : hoveredSong === i
                      ? song?.richThumbnail[0]?.url
                      : song?.thumbnail[0]?.url
                  }
                  style={{ height: imgHeight }}
                  loading={
                    i < 10 ? "lazy" : loadRemainingImgs ? "eager" : "lazy"
                  }
                  onError={(e) => {
                    e.target.src = song?.thumbnail[1]?.url;
                    setImagesErrorCount((prev) => prev + 1);
                  }}
                  // onError={(e) => { old api
                  //   e.target.src = song.thumbnail.url;
                  //   setImagesErrorCount((prev) => prev + 1);
                  // }}
                  alt={song.title}
                  onLoad={i < 10 ? handleLoadingImgs : undefined}
                />
                {/* {condition === song.id && isSongPlaying ? (  old api*/}
                {condition === song.videoId && isSongPlaying ? (
                  <div className={styles.WaveSpinner}>
                    <WaveSpinner
                      color={"wheat"}
                      size={
                        screenWidth > 1024
                          ? 95
                          : screenWidth > 900
                          ? 70
                          : screenWidth > 768
                          ? 60
                          : 50
                      }
                    />
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
