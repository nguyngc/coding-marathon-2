import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";

const LoginComponent = () => {
  const emailInput = useField('text');
  const passwordInput = useField('password');

  console.log("login...");

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input {...emailInput} />
      </label>
      <br />
      <label>
        Password:
        <input {...passwordInput} />
      </label>
      <br />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginComponent;