import { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { BsMusicNote } from "react-icons/bs";
import { Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ userName: "", password: "" });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const validatePassword = (password) => {
    const errors = [];
    if (!passwordRegex.test(password)) {
      if (password.length < 6) {
        errors.push("Password should be at least 6 characters long");
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errors.push("Password should contain at least one uppercase letter");
      }
      if (!/(?=.*\d)/.test(password)) {
        errors.push("Password should contain at least one number");
      }
      if (!/(?=.*[@$!%*?&])/.test(password)) {
        errors.push("Password should contain at least one special character");
      }
    }
    setPasswordErrors(errors);
    return errors.length === 0;
  };
  const tempUserData = {
    userName: "emma_smith",
    password: "password123",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword(data.password) && data.password.length >= 3) {
    axios
      .post("http://localhost:1000/users/login", tempUserData)
      .then((res) => localStorage.setItem("token", res.data))
      .catch((err) => console.log(err));
  }};
  return (
    <>
      <div className={styles.logoBackground}>
        <div className={styles.logoContainer}>
          <BsMusicNote
            style={{ marginBottom: "8px"}}
            size={103}
          />
          <span className={styles.logoText}> Chexi</span>
        </div>
      </div>

      <div className={styles.loginContainer}>
        <form className={styles.form}  onSubmit={handleSubmit} noValidate>
          <span>Login</span>
          <div className={styles.inputContainer}>
            <div>
          <label htmlFor="username">User name</label>
          <input
            type="text"
            id="username"
            placeholder="user name"
            value={data.userName}
            onChange={(e) =>
              setData((prev) => ({ ...prev, userName: e.target.value }))
            }
            className={data.userName.trim().length >= 3? styles.greenBorder : data.userName.trim().length >= 1 && styles.redBorder}
          />
          {(data.userName.trim().length < 3 && data.userName.trim().length >= 1) && <span className={styles.error}>User name should contain at least 3 chracters</span>}
          </div>
          <div >
            <label htmlFor="password">Password</label>
          <input
          className={`${passwordErrors.length > 0 ? styles.redBorder : data.password.trim().length > 6 && styles.greenBorder}`}
          id="password"
            type="password"
            placeholder="password"
            pattern={passwordRegex.toString()}
            value={data.password}
            onChange={(e) =>  {
              setData((prev) =>  ({ ...prev, password: e.target.value }));
              validatePassword(e.target.value)
            }
            }
          />
          {passwordErrors.length > 0 && (
                <span className={styles.error}>
                  {passwordErrors[passwordErrors.length - 1]}
                </span>)}
          </div>
          </div>
          <button type="submit" >Login</button>
          <Link  to={"/home"}>Continue as a guest</Link>
        </form>
      </div>
    </>
  );
}

export default Login;
