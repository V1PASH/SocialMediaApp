import "../Style/LoginForm.css";
import {useState} from "react";
import {NavLink} from "react-router-dom"
import { useDispatch } from "react-redux";
import {loginUser} from "../Actions/User"

function LoginForm(){
    const [credentials, setCredentials] = useState({email:"",password:""});
    const dispatch=useDispatch();

    function handleChange(event) {
        setCredentials({
        ...credentials,
            [event.target.name]:event.target.value})
    }

    function handleLogin (e)
    {
            e.preventDefault();
            
            dispatch(loginUser(credentials.email,credentials.password))
    }

    return (
        <>
            <div className="login">
                
                <form onSubmit={handleLogin} className="login-form">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={handleChange} required/>
                </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <br/>
                    <br/>
                    <br/>
                    <NavLink to="/forgot/password">Forgot Password</NavLink>
                    <br />
                    <NavLink to="/register">Register Now</NavLink>
                </form>
            </div>
        </>
    )
}

export default LoginForm;