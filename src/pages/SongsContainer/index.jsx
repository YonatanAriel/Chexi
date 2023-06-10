import { BsPlayCircleFill } from 'react-icons/bs';
import styles from './style.module.css'
import { GiLouvrePyramid } from 'react-icons/gi';
import { useContext, useEffect, useState } from 'react';
import HandlePlayingSongContext from '../../contexts';
import { FireworkSpinner,WaveSpinner } from "react-spinners-kit";

// ,setIsSongPlaying

function SongsContainer({ songs,songPlayed, setSongPlayed, isLibraryOpen, backgroundVideo }) {

  const {isSongPlaying,setIsSongPlaying} = useContext(HandlePlayingSongContext)
  const [imagesErrorCount, setImagesErrorCount] = useState(0)
  const [songDivHeight, setSongDivHeight] = useState("50.3vh")
  const [imgHeight,setImgHeight] = useState("15vw")
    useEffect(() => {  setImagesErrorCount(0)},[songs])
    useEffect(() => {
      if(imagesErrorCount === songs.length){
      setSongDivHeight("36vh");
      setImgHeight("8.415vw");
    }
    else {
      setSongDivHeight("50.3vh");
      setImgHeight("15vw");
    }},[imagesErrorCount, songs.length,songs])
      //  const songDiv = e.target.parentNode.parentNode;
      // if(imagesErrorCount === songs.length){ 
      //  e.target.style.height = "8.415vw", songDiv.style.height = '36vh'} 
      //  }

  return (<>
    <div style={{width: isLibraryOpen? "78.5vw" : "98.5vw"}} className={styles.mainDiv}>
      {songs?.length > 0 ? (
        songs.map((song, i) => ( 
          <div className={`${styles.song} ${backgroundVideo && styles.backgroundVideo}`} style={{height:songDivHeight, cursor: songPlayed !== song && "pointer"}} onClick={() => {setSongPlayed(song),setIsSongPlaying(true)}} key={i}>
            <div className={styles.imgAndButton}>
            {/* song.channel.icon */}
              <img key={song.thumbnail.id} className={styles.songImg} src={song.channel.icon} style={{height: imgHeight}} 
              onError={(e) => {e.target.src = song.thumbnail.url ; 
                    setImagesErrorCount(prev => prev + 1);}}
                     alt={song.title} />
                     {songPlayed == song && isSongPlaying ? (<div className={styles.songButtonOrAnima} ><WaveSpinner size={85} /></div>) 
                     : (<BsPlayCircleFill className={styles.songButton} size={40} />)}
                     
            </div>
            <h3>{song.title.split(/[\(\[]/)[0].trim().replace(/(.*)\s*-\s*(.*)/, '$2\n$1').trim().slice(0, 50)}</h3>
          </div>/*song.channel.icon? song.channel.icon : song.thumbnail.url*/
        ))
      ) : ( <div className={styles.loading} 
            style={{width: isLibraryOpen? "78.5vw" : "100vw"}}>
        < FireworkSpinner color="wheat" size={200} />
        </div>
      )}
    </div>
    </> );
  
}

export default SongsContainer
// .channel.icon / thumbnail.url 
//song.title.split(/[\(\[]/)[0].trim().slice(0,65).replace(/ ?- ?/g, "\n")

