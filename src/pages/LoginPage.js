import { Link } from 'react-router-dom';



function LoginPage(){
    return (        
    <div className='loginContainer'>
        <h1 className="loginHeader">Log In</h1>
        <label className="loginLabel">Username</label>
        <input className="loginInput" placeholder='Username'></input>
        <label className="loginLabel">Password</label>
        <input className="loginInput" placeholder='Password' type='password'></input>
        <Link className="loginBtn" to="/dashboard" >Log In</Link>
        <span id="loginSpan">Don't have an account? <Link to="/sign-up" id="signup-login">Sign Up</Link></span>
    </div>
    );
}
export default LoginPage;