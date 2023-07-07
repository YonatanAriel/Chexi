import { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { BsMusicNote } from "react-icons/bs";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm"

function Login() {
  return (
    <>
    <AuthForm title={"Login"}/>
    </>
  );
}

export default Login;
