import { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { BsMusicNote } from "react-icons/bs";
import { Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ userName: "", password: "" });
  const tempUserData = {
    userName: "emma_smith",
    password: "password123",
  };
  const handleSubmit = (e) => {
    console.log("245245");
    e.preventDefault();
    axios
      .post("http://localhost:1000/users/login", data)
      .then((res) => localStorage.setItem("token", res.data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className={styles.logoBackground}>
        <div className={styles.logoContainer}>
          <BsMusicNote
            style={{ marginBottom: "8px" /*marginBottom:"1.5vh"*/ }}
            size={103}
          />
          <span className={styles.logoText}> Chexi</span>
        </div>
      </div>

      <div className={styles.loginContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <span>Login</span>
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
          />
          </div>
          <div>
            <label htmlFor="password">Password</label>
          <input
          id="password"
            type="password"
            placeholder="password"
            value={data.password}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          </div>
          <button type="submit">Login</button>
          <Link to={"/home"}>enter as a guest</Link>
        </form>
      </div>
    </>
  );
}

export default Login;
