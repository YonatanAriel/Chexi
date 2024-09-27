import styles from "./style.module.css";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import Playlist from "../../components/playlist";
import NewPlaylistOrArtist from "../../components/popUps/NewPlaylistOrArtist";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import axios from "axios";
import api from "../../apiCalls/apiCalls";
import Loading from "../../components/Loading";

function FavoriteArtists({ setSongs, libraryWidth, screenWidth }) {
  const { handleSongsId } = useContext(HandlePlayingSongContext);
  const [showPopup, setShowPopup] = useState(false);
  const [artists, setArtists] = useState();
  const [currentArtist, setCurrentArtist] = useState({
    artistName: "",
    songs: "",
    showArtistSongs: false,
  });
  const containerWidth =
    libraryWidth == 0 || screenWidth < 900
      ? "100vw"
      : `calc(100vw - ${libraryWidth})`;
  // const options = { pld api
  //   method: "GET",
  //   url: "https://simple-youtube-search.p.rapidapi.com/search",
  //   params: {
  //     query: currentArtist.artistName,
  //     safesearch: "false",
  //   },
  //   headers: {
  //     "X-RapidAPI-Key": "8be7d08215msh45d28e3d9c633e3p109efajsn0dad38837480",
  //     "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
  //   },
  // };

  const options = {
    method: "GET",
    url: "https://yt-api.p.rapidapi.com/search?query=QUERY&type=video&sort=relevance",
    params: { query: currentArtist.artistName },
    headers: {
      "x-rapidapi-key": "8be7d08215msh45d28e3d9c633e3p109efajsn0dad38837480",
      "x-rapidapi-host": "yt-api.p.rapidapi.com",
    },
  };
  useEffect(() => {
    async function fetchData() {
      const res = await api.get("users/getfavoritartists");
      setArtists(res);
    }
    fetchData();
  }, [showPopup]);

  const handleArtistClick = async (artistName) => {
    setCurrentArtist((prev) => ({
      ...prev,
      artistName: artistName,
      songs: null,
      showArtistSongs: true,
    }));
  };

  useEffect(() => {
    const getSongs = async () => {
      try {
        const res = await axios.request(options);
        // const songsWithId = handleSongsId(res.data.results, true); old api
        const filteredSongs = res.data.data.filter(
          (video) => video.title !== "Shorts"
        );
        const songsWithId = handleSongsId(filteredSongs, true);
        setCurrentArtist((prev) => ({
          ...prev,
          songs: songsWithId,
        }));
      } catch (err) {}
    };
    if (currentArtist.artistName) getSongs();
  }, [currentArtist.artistName]);

  return (
    <>
      {currentArtist.showArtistSongs && (
        <Playlist
          screenWidth={screenWidth}
          libraryWidth={libraryWidth}
          setCurrentArtist={setCurrentArtist}
          setSongs={setSongs}
          setShowSongs={setCurrentArtist}
          title={currentArtist?.artistName}
          songs={currentArtist?.songs && currentArtist.songs}
        />
      )}

      <div style={{ display: currentArtist.showArtistSongs && "none" }}>
        {showPopup && (
          <NewPlaylistOrArtist
            setShowPopup={setShowPopup}
            page={"favoriteArtists"}
          />
        )}

        <div
          className={styles.FavoriteArtistsContainer}
          style={{
            width: containerWidth,
            left: screenWidth < 900 ? 0 : libraryWidth,
          }}
        >
          <div className={styles.addNewArtistContainer}>
            <span>New artist</span>
            <div
              className={styles.addArtistButton}
              onClick={() => setShowPopup(true)}
            >
              <BsFillPersonPlusFill size={screenWidth > 520 ? 90 : 65} />
            </div>
          </div>
          <div className={styles.artistsContainer}>
            {artists ? (
              artists.map((artist, i) => {
                return (
                  <div
                    onClick={() => handleArtistClick(artist.name)}
                    key={i}
                    className={styles.artist}
                  >
                    <img src={artist.img} />
                    <span>{artist.name}</span>
                  </div>
                );
              })
            ) : (
              <div style={{ width: "80vw" }}>
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default FavoriteArtists;
