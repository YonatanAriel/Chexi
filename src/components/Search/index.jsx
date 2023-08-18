import styles from "./style.module.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HandlePlayingSongContext from "../../contexts/HandlePlayingSong";

function Search({ setUserSearch, screenWidth }) {
  const [inputText, setInputText] = useState();
  const [isSpinning, setIsSpinning] = useState(false);
  const { setSongs } = useContext(HandlePlayingSongContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (inputText) {
      localStorage.setItem("searchSongs", null);
      setSongs(null);
      setUserSearch(inputText), navigate("/");
      setIsSpinning(true);
    }
  };

  const handleAnimationEnd = () => {
    setIsSpinning(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              screenWidth < 1057 ? "Search" : "what do you want to listen to?"
            }
            className={styles.searchField}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            <img
              src="\assets\photos\search.webp"
              onAnimationEnd={handleAnimationEnd}
              className={isSpinning ? styles.spinning : ""}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Search;
