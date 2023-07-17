import { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { BsMusicNote } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Token from "../../contexts/Token";
import api from "../../apiCalls/apiCalls"

function AuthForm({title}) {
  const [data, setData] = useState({ userName: "", password: "" });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [userNameErrors, setUserNameErrors] = useState([]);
  const {setToken} = useContext(Token)
  const navigate = useNavigate()
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  useEffect(() => {
    setUserNameErrors([]);
    if (data.userName.trim().length < 3 && data.userName.trim().length >= 1) {
      setUserNameErrors((prev) => [
        ...prev,
        "User name should contain at least 3 chracters",
      ]);
    }
  }, [data.userName]);
  const handleGuest = () => {
    localStorage.setItem("token", null)
    setToken(null)
  }
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
  const tempUserData2 = {
    userName: "nan",
    password: "password123",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.userName.trim().length >= 3) {
      if (validatePassword(data.password)) {
        if (title === "Login") {
          try{
            const loginToken = await api.post(`users/login`, data)
                localStorage.setItem("token", loginToken);
                setToken(loginToken)
                navigate("/")
          }
          catch(err){
                          console.log(err);
              if (err?.response?.data === "User not exist" || err?.response?.data === "password mismatch") {
                setUserNameErrors("Wrong user name or password");
            }
          }


        //   axios
        //     .post("http://localhost:1000/users/login", tempUserData)
        //     .then((res) => {
        //       localStorage.setItem("token", res.data);
        //       setToken(res.data)
        //       navigate("/")
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //       if (err?.response?.data === "User not exist") {
        //         setUserNameErrors("Wrong user name");
        //     }
        //     else if (err?.response?.data === "password mismatch")
        //     setPasswordErrors((prev) => [...prev, "Wrong password"]);
        // });
    }
    else if(title === "Register"){
      try{
        const registerToken = await api.post("users/register", data)
          localStorage.setItem("token", registerToken)
          setToken(registerToken)
          navigate("/")
          console.log(registerToken);
      }
      catch(err){
                    if(err?.response?.data === "User already exist"){
                setUserNameErrors("This user name is not available. Please choose a new one")
            }
            console.log(err)
            console.log(userNameErrors)
      }

        // axios.post("http://localhost:1000/users/register", data)
        // .then(res => {
        //   console.log(res.data)
        //   localStorage.setItem("token", res.data)
        //   setToken(res.data)
        //   navigate("/")})
        // .catch(err => {
        //     if(err?.response?.data === "User already exist"){
        //         setUserNameErrors("This user name is not available. Please choose a new one")
        //     }
        //     console.log(err)
        //     console.log(userNameErrors)
        //         })
        }
      }
    } else {
      setUserNameErrors("User name should contain at least 3 chracters");
    }
  };
  return (
    <>
      <div className={styles.logoBackground}>
        <div className={styles.logoContainer}>
          <BsMusicNote style={{ marginBottom: "8px" }} size={103} />
          <span className={styles.logoText}> Chexi</span>
        </div>
      </div>

      <div className={styles.loginContainer}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <span>{title}</span>
          <div className={styles.inputContainer}>
            <div>
              <label htmlFor="username">User name</label>
              <input
                type="text"
                id="username"
                placeholder="user name"
                autoComplete="username"
                // value={data.userName}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, userName: e.target.value }))
                }
                className={
                  data.userName.trim().length >= 3
                    ? styles.greenBorder
                    : (data.userName.trim().length >= 1? styles.redBorder: "")
                }
              />
              {userNameErrors && (
                <span className={styles.error}>{userNameErrors}</span>
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className={`${
                  passwordErrors.length > 0 ? styles.redBorder : (data.password.trim().length >= 6? styles.greenBorder : "")
                }`}
                id="password"
                type="password"
                placeholder="password"
                // pattern={passwordRegex.toString()}
                // value={data.password}
                autoComplete="current-password"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, password: e.target.value }));
                  validatePassword(e.target.value);
                }}
              />
              {passwordErrors.length > 0 && (
                <span className={styles.error}>
                  {passwordErrors[passwordErrors.length - 1]}
                </span>
              )}
            </div>
          </div>
          <button type="submit">{title}</button>
          <Link to={"/"} onClick={handleGuest}>Or - Continue as a guest</Link>
        </form>
      </div>
    </>
  );
}

export default AuthForm;
