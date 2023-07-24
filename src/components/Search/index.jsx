import styles from './style.module.css'
import { useState,useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import HandlePlayingSongContext from '../../contexts/HandlePlayingSong'

function Search({setUserSearch}) {
  const [inputText, setInputText] = useState()
  const [placeholder, setPlaceholder] = useState('what do you want to listen to?');
  const [isSpinning, setIsSpinning] = useState(false);
  const {setSongs} = useContext(HandlePlayingSongContext)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 863) {
        setPlaceholder('Search');
      } 
    else {
      setPlaceholder('What do you want to listen to?');
    }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleSearch = () => {
    if(inputText){
      localStorage.setItem("searchSongs", null)
      setSongs(null)
      setUserSearch(inputText) ,navigate('/')
      setIsSpinning(true);
    }
  }

  const handleAnimationEnd = () => {
    setIsSpinning(false);
  };

  return ( <>
    <div className={styles.container} >
      <div className={styles.form}>
        <input type="text" onKeyDown={(e) => {if(e.key === 'Enter'){handleSearch()}}} 
        onChange={(e) => setInputText(e.target.value) } placeholder={placeholder} 
        className={styles.searchField} />
        <button onClick={handleSearch} className={styles.searchButton}>
        <img src="src\assets\photos\search.webp" onAnimationEnd={handleAnimationEnd} 
        className={isSpinning ? styles.spinning : ''} />
      </button>
    </div>
  </div>
  </>
  )
  }

export default Search