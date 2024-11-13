import { useState } from "react";
import styles from "./style.module.css";

function Tooltip({ content, children, marginLeft }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`${styles.tooltip} ${marginLeft && styles.left}`}>
          {content}
        </div>
      )}
    </div>
  );
}
export default Tooltip;
