import { useContext, useRef } from "react";
import styles from "./style.module.css"
import { HiPlus } from "react-icons/hi";
import api from "../../apiCalls/apiCalls"
import axios from 'axios'

function AddArtist({setShowPopup}) {
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
      options.params.query = artistName
      const res = await axios.request(options);
      const img = res.data.results[0].channel.icon
      return img
    } catch (err) {
      console.log(err);
    }
  };


  const HandleAddArtist = async () => {
      const artistName = inputRef.current.value
    if(artistName.trim()){
      setShowPopup(false)
      const artistImg = await getArtistImg(artistName)
      await api.post("users/addfavoriteartist", {artistName: artistName, artistImg: artistImg})
      setShowPopup(null)
        //   axios.post("http://localhost:1000/users/addfavoriteartist" ,{artistName: artistName},
        //   {headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        //   })
        //   .then(res => console.log(res))
        //   .catch(err => console.log(err))
        }
  }

  return (
    <div className={styles.addNewArtistPopup}>
    <input
      type="text"
      ref={inputRef} 
      className={styles.popupInput}
      placeholder="What is the artist name?"
    />
    <button onClick={HandleAddArtist} className={styles.popupButton}>
      <HiPlus size={25} />
    </button>
  </div>

  )
}

export default AddArtist
