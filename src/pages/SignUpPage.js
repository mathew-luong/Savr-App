import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function SignUpPage(){
    const usernameInput = useRef();
    const passwordInput = useRef();
    const passwordConfirm = useRef();
    let navigate = useNavigate();

    // Handles a user signing up
    function signupHandler(event) {
        event.preventDefault();

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        const pwdConfirm = passwordConfirm.current.value;

        // Check if password = pwdConfirm
        console.log("This is username: " + username + " Password: " + password + " Confirm: " + pwdConfirm);
        // Fetch data from db??

        // Login successful, navigate to startup page
        navigate("/start-up");
    }

    return (
    <div>
        <form className='loginContainer' onSubmit={signupHandler}>
            <h1 className="loginHeader">Sign Up</h1>
            <label htmlFor="signUpUser" className="loginLabel">Username</label>
            <input required className="loginInput" placeholder='Username' id="signUpUser" ref={usernameInput}></input>
            <label htmlFor="signUpPw" className="loginLabel">Password</label>
            <input required className="loginInput" placeholder='Password' type='password' id="signUpPw" ref={passwordInput}></input>
            <label htmlFor="signUpPw2" className="loginLabel">Confirm Password</label>
            <input required className="loginInput" placeholder='Password' type='password' id="signUpPw2" ref={passwordConfirm}></input>
            <button className="loginBtn">Sign Up</button>
        </form>
    </div>
    );
}
export default SignUpPage;