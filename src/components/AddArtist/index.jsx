import { useContext, useRef } from "react";
import styles from "./style.module.css"
import { HiPlus } from "react-icons/hi";
import axios from "axios"
import api from "../../apiCalls/apiCalls"

function AddArtist({setShowPopup}) {
  const inputRef = useRef(null)

  const HandleAddArtist = () => {
      const artistName = inputRef.current.value
    if(artistName.trim()){
      setShowPopup(false)
      api.post("users/addfavoriteartist", {artistName: artistName})

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
