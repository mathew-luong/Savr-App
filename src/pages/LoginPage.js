import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';


function LoginPage() {
    const usernameInput = useRef();
    const passwordInput = useRef();
    let navigate = useNavigate();

    function loginHandler(event) {
        event.preventDefault();

        window.location.assign("http://localhost:3100/dashboard");

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;

        // Check if username in db and if pwd matches??
        console.log("This is username: " + username + " Password: " + password);

        // Login successful, navigate to dashboard page
        navigate("/dashboard");
    }

    return (
        <div>
            <form className='loginContainer' onSubmit={loginHandler}>
                <h1 className="loginHeader">Log In</h1>
                <label htmlFor="loginUser" className="loginLabel">Username</label>
                <input required className="loginInput" placeholder='Username' id="loginUser" ref={usernameInput}></input>
                <label htmlFor="loginPw" className="loginLabel">Password</label>
                <input required className="loginInput" placeholder='Password' type='password' id="loginPw" ref={passwordInput}></input>
                <button className="loginBtn">Log In</button>
                <span id="loginSpan">Don't have an account? <Link to="/sign-up" id="signup-login">Sign Up</Link></span>
            </form>
        </div>
    );
}
export default LoginPage;