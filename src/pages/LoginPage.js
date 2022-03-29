import { Link } from 'react-router-dom';
import { useRef } from 'react';


function LoginPage(){
    const usernameInput = useRef();
    const passwordInput = useRef();

    function loginHandler(event) {
        event.preventDefault();

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;

        // Check if username in db and if pwd matches??
        console.log("This is username: " + username + " Password: " + password);
    }

    return (        
    <div>
        <form className='loginContainer' onSubmit={loginHandler}>
            <h1 className="loginHeader">Log In</h1>
            <label htmlFor="loginUser" className="loginLabel">Username</label>
            <input required className="loginInput" placeholder='Username' id="loginUser" ref={usernameInput}></input>
            <label htmlFor="loginPw" className="loginLabel">Password</label>
            <input required className="loginInput" placeholder='Password' type='password' id="loginPw" ref={passwordInput}></input>
            {/* Maybe have to replace this with <button> */}
            {/* <button className="loginBtn">Log In</button> */}
            <Link className="loginBtn" to="/dashboard" >Log In</Link>
            <span id="loginSpan">Don't have an account? <Link to="/sign-up" id="signup-login">Sign Up</Link></span>
        </form>
    </div>
    );
}
export default LoginPage;