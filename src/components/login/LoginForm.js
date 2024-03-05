import React from "react";
import '../../css/loginForm.css'
// import 'bootstrap/dist/css/bootstrap.min.css'


export default function LoginForms() {
    return (
        <>

            <div className="wrapper d-flex align-items-center justify-content-center w-100">
                {/* <img className="w-100" src="../assets/img/carousel-2.jpg" /> */}
                <div className="login">
                    <h2>Login Form</h2>
                    <form className="needs-validation">
                        <div className="form-group was-validated mb-2">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input type="email" className="form-control" required></input>
                            <div className="invalid-feedback">
                                Please Enter you email
                            </div>
                        </div>
                        <div className="form-group was-validated mb-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" required></input>
                            <div className="invalid-feedback">
                                Please Enter your password
                            </div>
                        </div>
                        <div className="form-group form-check mb-2">
                            <input type="checkbox" className="form-check-input"></input>
                            <label htmlFor="check" className="form-check-label">Remember me</label>
                        </div>
                        <button type="submit" className="btn btn-success w-100 mt-2">SIGN IN</button>
                    </form>
                </div>
            </div>

        </>
    );
}
