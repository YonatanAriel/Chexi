import { useState, useContext } from "react";
import styles from "./style.module.css"
import {ImMenu} from "react-icons/im"
import { HiLogin, HiLogout } from "react-icons/hi";
import { MdAssignmentInd } from "react-icons/md";
import Token from "../../contexts/Token";
import { Link } from "react-router-dom";

function MobileOption({handleLogout}) {
    const { token, setToken } = useContext(Token);
    const [showDropDownContent, setShowDropDownContent] = useState(false);
    const togleDropDown = () => {
        setShowDropDownContent(prev => !prev)
    }

    return <>
            <div className={styles.dropBtn}><ImMenu size={24} onClick={togleDropDown} /></div>
            {showDropDownContent && <div className={styles.dropDownContent}>
          {token? (
            <Link
              to="/"
              onClick={handleLogout}
            >
              <HiLogout size={19} style={{ marginBottom: "-0.6vh" }} />
              <span>Log out</span>
            </Link>
          ) : (
             (<Link to="./Login">
              <HiLogin size={19} style={{ marginBottom: "-0.6vh" }} />
              <span>Log In</span>
            </Link>)
          )}
          {!token && (
            <Link to="./SignUp">
              <MdAssignmentInd style={{ marginBottom: "-0.3vh" }} />
              <span>Sign Up</span>
            </Link>
          )}
                </div>}

          </>
}
export default MobileOption