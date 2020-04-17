import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import {Container} from "reactstrap"
import "./login.css"

function Login() {

    return(
        <Container fluid>
            <Header/>
            <Container fluid>
                <div className="wrapper">
                    <form className="form-signin">
                        <h2 className="title text-center">LOGIN</h2>
                        <input type="text" className="form-control" name="username" placeholder="Email Address"
                               required="" autoFocus=""/>
                        <input type="password" className="form-control" name="password" placeholder="Password"
                               required=""/>
                        <label className="checkbox">
                            <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
                        </label>
                        <button className="btn btn-lg btn-block btn-signin" type="submit">Login</button>
                    </form>
                </div>
            </Container>
            <Footer/>
        </Container>
    )
}

export default Login;
