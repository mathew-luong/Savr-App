import { useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import { addNewUser } from "../services/signupPage";
import GeneralContext from "../services/userContext"

function SignUpPage() {
  const usernameInput = useRef();
  const passwordInput = useRef();
  const passwordConfirm = useRef();
  let navigate = useNavigate();
  let generalContext = useContext(GeneralContext)

  // Handles a user signing up
  async function signupHandler(event) {
    event.preventDefault();

    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    const pwdConfirm = passwordConfirm.current.value;

    if (password === pwdConfirm) {
      let userData = {
        username: username,
        password: password,
        type: 1,
      };

      let response = await addNewUser(userData);
      if (response !== "error") {
          generalContext.setUserIdentification(response.data.userId)
        console.log(response)
        navigate("/start-up");
      }
    } else {
      alert("passwords do not match, try again");
    }
  }

  return (
    <div>
      <form className="loginContainer" onSubmit={signupHandler}>
        <h1 className="loginHeader">Sign Up</h1>
        <label htmlFor="signUpUser" className="loginLabel">
          Username
        </label>
        <input
          required
          className="loginInput"
          placeholder="Username"
          id="signUpUser"
          ref={usernameInput}
        ></input>
        <label htmlFor="signUpPw" className="loginLabel">
          Password
        </label>
        <input
          required
          className="loginInput"
          placeholder="Password"
          type="password"
          id="signUpPw"
          ref={passwordInput}
        ></input>
        <label htmlFor="signUpPw2" className="loginLabel">
          Confirm Password
        </label>
        <input
          required
          className="loginInput"
          placeholder="Password"
          type="password"
          id="signUpPw2"
          ref={passwordConfirm}
        ></input>
        <button className="loginBtn">Sign Up</button>
      </form>
    </div>
  );
}
export default SignUpPage;
