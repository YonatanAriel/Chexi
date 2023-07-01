import { useContext, useRef } from "react";
import styles from "./style.module.css"
import { HiPlus } from "react-icons/hi";
import User from "../../contexts/User";
import axios from "axios"

function AddArtist({setShowPopup}) {
  const inputRef = useRef(null)
  const {id} = useContext(User)

  const HandleAddArtist = () => {
    const artistName = inputRef.current.value
    if(artistName.trim()){
      setShowPopup(false)
      console.log(id);
      axios.post("http://localhost:1000/users/addfavoriteartist" ,{userId: id, artistName: artistName})
      .then(res => console.log(res))
      .catch(err => console.log(err))
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
