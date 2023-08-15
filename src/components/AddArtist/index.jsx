import styles from "./style.module.css"
import { useRef, useState } from "react";
import { HiPlus } from "react-icons/hi";
import api from "../../apiCalls/apiCalls"
import axios from 'axios'

function AddArtist({setShowPopup}) {
  const [fetchArtistImgRetryCount, setFetchArtistImgRetryCount] = useState(0);
  const maxFetchArtistImgRetryCount = 3;
  const inputRef = useRef(null)
  const options = {
    method: "GET",
    url: "https://simple-youtube-search.p.rapidapi.com/search",
    params: {
      safesearch: "false",
    },
    headers: {
      "X-RapidAPI-Key": "8be7d08215msh45d28e3d9c633e3p109efajsn0dad38837480",
      "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
    },
  };
  

  const getArtistImg = async (artistName) => {
    try {
      options.params.query = artistName;
      const res = await axios.request(options);
      const img = res.data.results[0].channel.icon;
      return img;
    } catch (err) {
      if (fetchArtistImgRetryCount < maxFetchArtistImgRetryCount) {
          setTimeout(() => {
            setFetchArtistImgRetryCount((prevFetchArtistImgRetryCount) => prevFetchArtistImgRetryCount + 1);
          }, 1000);
      }
    }
  };

  const HandleAddArtist = async () => {
    const artistName = inputRef.current.value;
    if (artistName.trim()) {
      setShowPopup(false);
      let artistImg = await getArtistImg(artistName);
            while (!artistImg && fetchArtistImgRetryCount < maxFetchArtistImgRetryCount) {
        artistImg = await getArtistImg(artistName);
      }

      if (artistImg) {
        await api.post("users/addfavoriteartist", { artistName: artistName, artistImg: artistImg });
      } 
      
      setShowPopup(null);
    }
  };

  return (
    <div className={styles.addNewArtistPopup}>
      <input
        type="text"
        ref={inputRef} 
        className={styles.popupInput}
        placeholder="Artist name"
        onKeyDown={(e) => {if(e.key === 'Enter'){HandleAddArtist()}}}
      />
      <button onClick={HandleAddArtist} className={styles.popupButton}>
        <HiPlus size={25} />
      </button>
  </div>

  )
}

export default AddArtist
