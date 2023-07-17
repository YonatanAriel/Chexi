import styles from "./style.module.css";
import { BsFillPersonPlusFill, BsFillPlusCircleFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import Playlist from "../../components/playlist";
import NewPlaylistOrArtist from "../../components/popUps/newPlaylistOrArtist";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";
import axios from "axios";
import api from "../../apiCalls/apiCalls"
import Token from "../../contexts/Token";
import Loading from "../../components/Loading";

function FavoriteArtists({setSongs}) {
  const [showPopup, setShowPopup] = useState(false);
  const { songs, songPlayed, handleSongsId } = useContext(
    HandlePlayingSongContext
  );
  const { token } = useContext(Token);
  const [artists, setArtists] = useState();
  const [currentArtist, setCurrentArtist] = useState({
    artistName: "",
    songs: "",
    showArtistSongs: false,
  });
  const options = {
    method: "GET",
    url: "https://simple-youtube-search.p.rapidapi.com/search",
    params: {
      query: currentArtist.artistName,
      safesearch: "false",
    },
    headers: {
      "X-RapidAPI-Key": "8be7d08215msh45d28e3d9c633e3p109efajsn0dad38837480",
      "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
    },
  };

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("users/getfavoritartists")
      setArtists(res)
    }
    fetchData()

    // axios
    //   .get("http://localhost:1000/users/getfavoritartists", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => setArtists(res.data))
    //   .catch((err) => console.log(err));
  }, [showPopup]);

  const handleArtistClick = async (artistName) => {
    setCurrentArtist((prev) => ({ ...prev, artistName: artistName, songs: null, showArtistSongs: true}));
  };
  useEffect(() => {
    const getSongs = async () => {
      try {
        const res = await axios.request(options);
        const songsWithId = handleSongsId(res.data.results, true);
        setCurrentArtist((prev) => ({
          ...prev,
          songs: songsWithId
        }));
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    if(currentArtist.artistName) getSongs()
  }
  , [currentArtist.artistName]);

  return (
    <>
      {currentArtist.showArtistSongs && (
        <Playlist
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

        <div className={styles.FavoriteArtistsContainer}>
          <div className={styles.addNewArtistContainer}>
            <span>New artist</span>
            <div
              className={styles.addArtistButton}
              onClick={() => setShowPopup(true)}
            >
              <BsFillPersonPlusFill size={90} />
            </div>
          </div>
          <div className={styles.artistsContainer}>
            {artists? (artists.map((artist, i) => {
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
            })) : <div  style={{width: "80vw"}} ><Loading /></div> }
          </div>
        </div>
      </div>
    </>
  );
}
export default FavoriteArtists;
