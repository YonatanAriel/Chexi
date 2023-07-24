import AuthForm from "../../components/AuthForm";

function SignUp({ setUserSearch }) {
  return (
    <>
      <AuthForm setUserSearch={setUserSearch} title={"Register"} />
    </>
  );
}

export default SignUp;
