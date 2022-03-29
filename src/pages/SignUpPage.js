import { Link } from 'react-router-dom';
import { useRef } from 'react';

function SignUpPage(){
    const usernameInput = useRef();
    const passwordInput = useRef();
    const passwordConfirm = useRef();

    // Handles a user signing up
    function signupHandler(event) {
        event.preventDefault();

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        const pwdConfirm = passwordConfirm.current.value;

        // Check if password = pwdConfirm
        console.log("This is username: " + username + " Password: " + password + " Confirm: " + pwdConfirm);
        // Fetch data from db??
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
            {/* Maybe have to replace this with <button> */}
            <Link className="loginBtn" to="/start-up" >Sign Up</Link>
        </form>
    </div>
    );
}
export default SignUpPage;