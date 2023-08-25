import { Link } from "react-router-dom";
import styles from "./style.module.css";
function AccessInfo({ libraryWidth, screenWidth }) {
  const containerWidth =
    libraryWidth == 0 || screenWidth < 900
      ? "100vw"
      : `calc(100vw - ${libraryWidth})`;

  return (
    <div
      className={styles.container}
      style={{
        left: screenWidth < 900 ? 0 : libraryWidth,
        width: containerWidth,
      }}
    >
      <div className={styles.prompt}>
        <div className={styles.text}>
          <h2>This content is only available to signed-in users.</h2>
          <h2>Please sign in or register to access the full content.</h2>
          <Link to="/Login">
            <h3>Sign In</h3>
          </Link>
          <Link to="/SignUp">
            <h3>Register</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccessInfo;
