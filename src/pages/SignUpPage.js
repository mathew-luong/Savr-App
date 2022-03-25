import { Link } from 'react-router-dom';

function SignUpPage(){
    return (
        <div className='loginContainer'>
        <h1 className="loginHeader">Sign Up</h1>
        <label className="loginLabel">Username</label>
        <input className="loginInput" placeholder='Username'></input>
        <label className="loginLabel">Password</label>
        <input className="loginInput" placeholder='Password' type='password'></input>
        <label className="loginLabel">Confirm Password</label>
        <input className="loginInput" placeholder='Password' type='password'></input>
        <Link className="loginBtn" to="/start-up" >Sign Up</Link>
    </div>
    );
}
export default SignUpPage;