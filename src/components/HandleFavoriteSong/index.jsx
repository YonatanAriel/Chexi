import {  FaRegHeart, FaHeart} from "react-icons/fa"
import styles from "./style.module.css"
import { useContext, useEffect, useState } from "react"
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong"

function HandleFavoriteSong() {
    const {songPlayed} = useContext(HandlePlayingSongContext)
    const [isFavoriteSong, setIsFavoriteSong] = useState(false)
    // useEffect(() => {
    //     if(isFavoriteSong && songPlayed){
    //         axios.post("http://localhost:1000/playlists/addplaylist", { name: inputValue })
    //         .then(res =>{
    //           setPlaylistId(res.data._id)
    //         }).catch(err => console.log(err))
    //       }
        

    //     }

    // }, [isFavoriteSong])

  return ( <>
              {isFavoriteSong? (<FaHeart size={18} style={{color:"red", cursor: "pointer"}} onClick={() => setIsFavoriteSong(false)} />)
                 :
               (<FaRegHeart size={18} className={styles.heart} onClick={() => setIsFavoriteSong(true)} />)}
           </>
  )
}

export default HandleFavoriteSong
