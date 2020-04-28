import React, {} from "react";
import {Container} from "reactstrap"
import "./login.css"

function Login(props) {

    return(
        <Container fluid>
            <Container fluid>
                <div className="wrapper">
                    <form className="form-signin">
                        <h2 className="title text-center">LOGIN</h2>
                        <input type="text" className="form-control" name="username" placeholder="Username" id="username"
                               required="" autoFocus=""/>
                        <input type="password" className="form-control" name="password" placeholder="Password" id="password"
                               required=""/>
                        <input type="password" className="form-control" name="conpassword" placeholder="Confirm Password" id="cpassword"
                               required=""/>
                        <label className="checkbox">
                            <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
                        </label>
                        <label className="checkbox">
                            <input type="checkbox" value="is-admin" id="isadmin" name="isAdmin"/> Check admin
                        </label>
                        <button className="btn btn-lg btn-block btn-signin" type="submit" id="btnLog">Login</button>
                    </form>
                </div>
            </Container>
        </Container>
    )
}

export default Login;
