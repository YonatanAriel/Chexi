import AuthForm from "../../components/AuthForm";

function Login({ setUserSearch }) {
  return (
    <>
      <AuthForm setUserSearch={setUserSearch} title={"Login"} />
    </>
  );
}

export default Login;
