import { useState,useEffect} from 'react'
import styles from './style.module.css'
import {useNavigate} from 'react-router-dom'

function Search({setUserSearch}) {
  const [inputText, setInputText] = useState()
  const navigate = useNavigate()
  const [placeholder, setPlaceholder] = useState('what do you want to listen to?');
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
    setUserSearch(inputText) ,navigate('/')
  }

  return ( <>
    <div className={styles.container} >
    <div className={styles.form}>
      <input type="text" onKeyDown={(e) => {if(e.key === 'Enter'){handleSearch()}}} 
      onChange={(e) => setInputText(e.target.value) } placeholder={placeholder} className={styles.searchField} />
      <button onClick={handleSearch} className={styles.searchButton}>
        <img src="src\assets\photos\search.webp" />
      </button>
    </div>
  </div>
  </>
  )
  }

export default Search