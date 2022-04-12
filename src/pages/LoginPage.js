import { Link, useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
import {checkUser} from '../services/loginPage'
import GeneralContext from '../services/userContext';


function LoginPage(){
    const usernameInput = useRef();
    const passwordInput = useRef();
    let navigate = useNavigate();
    let generalContext = useContext(GeneralContext);

    async function loginHandler(event) {
        event.preventDefault();

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;

        // Check if username in db and if pwd matches??
        // console.log("This is username: " + username + " Password: " + password);
        
        let userData = {
            username: username,
            password:password
        }

        let response = await checkUser(userData);
        if(response !== "error"){
            generalContext.setUserIdentification(response.data.userId)
            generalContext.setUsername(response.data.username)
            generalContext.setUserIdentification(response.data.userId)
            navigate('/dashboard')
        }

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