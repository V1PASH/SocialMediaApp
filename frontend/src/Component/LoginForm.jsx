import "../Style/LoginForm.css";
import {useState} from "react";
import {NavLink} from "react-router-dom"
import { useDispatch } from "react-redux";
import {loginUser} from "../Actions/User"

function LoginForm(){
    const [credentials, setCredentials] = useState({username:"",password:""});
    const dispatch=useDispatch();

    function handleChange(event) {
        setCredentials({
        ...credentials,
            [event.target.name]:event.target.value})
    }

    function handleLogin (e)
    {
            e.preventDefault();
            
            dispatch(loginUser(credentials.username,credentials.password))
    }

    return (
        <>
            
            <section className="login">
                <div className="container">
                    <div class="row justify-content-center">
                        <div className="col-md-6 col-sm-0">
                            ghj
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="login-container">
                                <h1 className="text-center fw-bolder">Login</h1>
                                <form onSubmit={handleLogin} className="login-form">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Username</label>
                                        <input type="text" className="form-control" name="username" value={credentials.username} onChange={handleChange} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Password</label>
                                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange} required/>
                                    </div>
                                    <button type="submit" className="btn login-btn">Login</button>
                                    <br/>
                                    <p className="text-end"><NavLink to="/forgot/password">Forgot Password?</NavLink></p>
                                    <br />
                                    <div className="mb-3 text-center">
                                        <p>Don't have an account ?</p>
                                        <NavLink to="/register">Sign Up</NavLink>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>    
        </>
    )
}

export default LoginForm;