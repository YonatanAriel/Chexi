import styles from './style.module.css'
import {BsFillArrowRightCircleFill, BsArrowRightCircle} from "react-icons/bs"
import {useLocation} from "react-router-dom"

function GoBackButton({setShowSongs}) {
    const loaction = useLocation().pathname
    const handleGoBack = () => {
      console.log(loaction);
      if(loaction === "/FavoriteArtists") {
        setShowSongs(prev => ({...prev ,showArtistSongs:false}))
      }
      else setShowSongs(false)
    }
  return (
    <div onClick={handleGoBack} className={styles.arrowButton}>
      <BsArrowRightCircle size={50} />
    </div>
  )
}

export default GoBackButton
