import styles from "./style.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { BsMusicNote } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Token from "../../contexts/Token";
import api from "../../apiCalls/apiCalls";
import Loading from "../Loading";

function AuthForm({ title, setUserSearch }) {
  const [data, setData] = useState({ userName: "", password: "" });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [userNameErrors, setUserNameErrors] = useState([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showLoadingDiv, setShowLoadingDiv] = useState(false);
  const demoUserData = { userName: "demoUser", password: "55Da$s" };
  const location = useLocation();
  const formRef = useRef();

  const { setToken } = useContext(Token);
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const userNameRef = useRef();

  useEffect(() => userNameRef.current.focus(), []);

  useEffect(() => {
    setUserNameErrors([]);
    if (data.userName.trim().length < 3 && data.userName.trim().length >= 1) {
      setUserNameErrors((prev) => [
        ...prev,
        "User name should contain at least 3 characters",
      ]);
    }
  }, [data.userName]);

  const handleGuest = () => {
    localStorage.setItem("token", null);
    setToken(null);
  };

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

  const handleLogin = async (userData, newVisitor) => {
    try {
      const loginToken = await api.post(`users/login`, userData);
      localStorage.setItem("token", loginToken);
      setUserSearch("Post malone");
      setToken(loginToken);
      // if (newVisitor) {
      //   navigate("/?newVisitor=true");
      // } else {
      //   navigate("/");
      // }
    } catch (err) {
      setShowLoadingDiv(false);
      formRef.current.style.cursor = "auto";
      if (
        err?.response?.data === "User not exist" ||
        err?.response?.data === "password mismatch"
      ) {
        setUserNameErrors("Wrong user name or password");
      }
    }
  };

  const handleRegister = async () => {
    try {
      const registerToken = await api.post("users/register", data);
      localStorage.setItem("token", registerToken);
      setToken(registerToken);
      setUserSearch("Post malone");
      navigate("/");
    } catch (err) {
      setShowLoadingDiv(false);
      formRef.current.style.cursor = "auto";
      if (err?.response?.data === "User already exist") {
        setUserNameErrors(
          "This user name is not available. Please choose a new one"
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoadingDiv(true);

    formRef.current.style.cursor = "wait";
    if (isDemoMode) {
      handleLogin(demoUserData);
      return;
    }
    if (!(data.userName.trim().length >= 3)) {
      setUserNameErrors("User name should contain at least 3 characters");
      formRef.current.style.cursor = "auto";
      setShowLoadingDiv(false);
      return;
    }
    if (!validatePassword(data.password)) {
      formRef.current.style.cursor = "auto";
      setShowLoadingDiv(false);
      return;
    }
    if (title === "Login") {
      handleLogin(data);
      return;
    } else if (title === "Register") {
      handleRegister();
    }
  };

  return (
    <>
      <div className={styles.logoBackground}>
        <div className={styles.logoContainer}>
          <BsMusicNote style={{ marginBottom: ".6em" }} size={103} />
          <span className={styles.logoText}> Chexi</span>
        </div>
      </div>

      <div className={styles.loginContainer} ref={formRef}>
        {showLoadingDiv && (
          <div className={styles.loadingDiv}>
            <Loading />
          </div>
        )}
        <form
          style={{ display: showLoadingDiv && "none" }}
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
        >
          <span>{title}</span>
          <div className={styles.inputContainer}>
            <div>
              <label htmlFor="username">User name</label>
              <input
                ref={userNameRef}
                type="text"
                id="username"
                placeholder="user name"
                autoComplete="username"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, userName: e.target.value }))
                }
                className={
                  data.userName.trim().length >= 3
                    ? styles.greenBorder
                    : data.userName.trim().length >= 1
                    ? styles.redBorder
                    : ""
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
                  passwordErrors.length > 0
                    ? styles.redBorder
                    : data.password.trim().length >= 6
                    ? styles.greenBorder
                    : ""
                }`}
                id="password"
                type="password"
                placeholder="password"
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
          <div className={styles.orContent}>
            <span>Or</span>
            <span>
              For a quick preview -
              <button type="submit" onClick={() => setIsDemoMode(true)}>
                Demo mode
              </button>
            </span>
            <Link to={"/"} onClick={handleGuest}>
              Continue as a guest
            </Link>
            {location.pathname == "/Login" ? (
              <Link to={"/SignUp"}>Register</Link>
            ) : (
              <Link to={"/Login"}>Log in</Link>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default AuthForm;

//another way to do automatic login, works great, but because the server is slow the user sometimes will just see a spinner..
/* useEffect(() => {
   const params = new URLSearchParams(location.search);
   const demoMode = params.get("demo") === "true";
   if (demoMode) {
   // setIsDemoMode(true);
     setShowLoadingDiv(true);
     }  handleLogin(demoUserData, true);
   }
  , [location.search]); */
