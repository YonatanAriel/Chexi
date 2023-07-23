import styles from "./style.module.css";
import { BsMusicNote } from "react-icons/bs";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm"

function Login({setUserSearch}) {
  return (
    <>
    <AuthForm setUserSearch={setUserSearch} title={"Login"}/>
    </>
  );
}

export default Login;
