import "../Style/Register.css"
import {NavLink} from "react-router-dom"

function RegisterNow(){
    function handleRegister(e){
            e.preventDefault();
    }
    return(
        <>
        <section className="register">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-sm-12">
                        <div className="register-container">
                            <div className="register-form">
                                <h1 className="text-center fw-bolder">Register</h1>
                                <form onSubmit={handleRegister} className="register-form">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Name</label>
                                    <input type="text" className="form-control" name="username" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Username</label>
                                    <input type="text" className="form-control"  name="username" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Email</label>
                                    <input type="email" className="form-control"  name="username" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Password</label>
                                    <input type="password" className="form-control"  name="password" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" name="username" required/>
                                </div>
                                    <button type="submit" className="btn btn-register">Register</button>
                                    
                                    <div className="mb-3 text-center">
                                        Already Have An Account?
                                        <br/>
                                        <NavLink to="/">Login</NavLink>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
       
        </>
    )
}

export default RegisterNow;