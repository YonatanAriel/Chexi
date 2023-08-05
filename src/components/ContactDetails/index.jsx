import styles from "./style.module.css";
import { useRef } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

const ContactDetails = () => {
  const emailRef = useRef(null);

  const handleCopy = () => {
    try {
      const emailText = emailRef.current.innerText;
      navigator.clipboard.writeText(emailText);
    } catch (err) {
    }
  };

  return ( <>
    <div className={styles.container}>
      <h2>Contact Me</h2>
      <div className={styles.emailContainer}>
      <div  onClick={handleCopy}>
          <MdOutlineContentCopy style={{margin: "0 4px -3px 0", cursor:"pointer"}}/>
        </div>
        <div className={styles.emailLink}>
          <a
            className={styles.email}
            href="mailto:yonatanriel@gmail.com"
            ref={emailRef}
          >
            yonatanriel@gamil.com
          </a>
        </div>
      </div>
      <a
      className={styles.linkedinLink}
        href="https://www.linkedin.com/in/yonatan-ariel"
      >
        Linkedin
      </a>
    </div>
    </>
  );
};

export default ContactDetails;
