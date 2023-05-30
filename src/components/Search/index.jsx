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

  return ( <>
    <div className={styles.container} >
    <div className={styles.form}>
      <input type="text" onChange={(e) => setInputText(e.target.value) } placeholder={placeholder} className={styles.searchField} />
      <button onClick={() => {setUserSearch(inputText) ,navigate('/')}} className={styles.searchButton}>
        <img src="src\photos\search.webp" />
      </button>
    </div>
  </div>
  </>
  )
  }

export default Search