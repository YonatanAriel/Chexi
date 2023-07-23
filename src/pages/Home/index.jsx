import { BsPlayCircleFill } from "react-icons/bs";
import styles from "./style.module.css";
import { GiLouvrePyramid } from "react-icons/gi";
import { lazy, useContext, useEffect, useState } from "react";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import { FireworkSpinner, WaveSpinner } from "react-spinners-kit";
import Playlist from "../../components/playlist";
import Playlists from "../../contexts/Playlists";
import Loading from "../../components/Loading";

// ,setIsSongPlaying

function Home({
  isLibraryOpen,
  backgroundVideo,
}) {
  const { isSongPlaying, setIsSongPlaying, songPlayed, setSongPlayed, songs, setSongs } = useContext(
    HandlePlayingSongContext
  );
  // const LStorageSearchSongs = localStorage.getItem("searchSongs")
  const [searchSongs, setSearchSongs] = useState()
  //  useState(LStorageSearchSongs && JSON.parse(LStorageSearchSongs))
  // useState(JSON.parse(localStorage.getItem("searchSongs") ?? []))
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
        // setSearchSongs([]); 
      }
    }  }
    // localStorage?.getItem("searchSongs") != undefined && setSearchSongs(JSON.parse(localStorage?.getItem("searchSongs")))}
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
  //  const songDiv = e.target.parentNode.parentNode;
  // if(imagesErrorCount === songs.length){
  //  e.target.style.height = "8.415vw", songDiv.style.height = '36vh'}
  //  }

  return (
    <>
      <div
        className={`${styles.mainDiv} ${isLibraryOpen? styles.decreaseMainDivWidth : ""}`}
      >
        {songs?.length > 0 ? (
          searchSongs?.map((song, i) => (
            // ${backgroundVideo && styles.backgroundVideo}
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
                {condition === song.id && isSongPlaying ? (
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
          <Loading />
        )}
      </div>
    </>
  );
}

export default Home;
// .channel.icon / thumbnail.url
//song.title.split(/[\(\[]/)[0].trim().slice(0,65).replace(/ ?- ?/g, "\n")
