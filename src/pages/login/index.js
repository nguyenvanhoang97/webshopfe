import React, {useState} from "react";
import {Container} from "reactstrap"
import "./index.css"
import {Redirect, withRouter} from 'react-router-dom';
import Request from "../../utils/request";

function Login(props) {
    const isLogin = props.match.path === '/login'
    const isRegister = props.match.path === '/register'

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [cpassword, setConPass] = useState('');
    const [isAdmin, setAdmin] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState(null);
    const register = e => {
        if (cpassword === password) {
            e.preventDefault()
            Request.postNoToken("user", {name, username, password, isAdmin})
                .then(function (response) {
                    const {data} = response
                    console.log(data)
                    if (data.ok===false) {
                        alert(data.msg)
                    } else {
                        alert("Đăng ký thành công")
                        window.location.replace('/login')
                    }
                }).catch(err => {
                err.response && err.response.data && err.response.data.msg && alert(err.response.data.msg)
            })
        } else {
            alert('Mật khẩu không trùng khớp');
        }
    }

    const login = e => {
        e.preventDefault()
        if (username && password) {
            Request.postNoToken("user/login", {username, password})
                .then(function (response) {
                    const {data} = response
                    console.log(data)
                    if (data.ok) {
                        localStorage.setItem("token", data.token)
                        localStorage.setItem("isAdmin", data.user.isAdmin ? 1 : 0)
                        if (data.user.isAdmin) {
                            setRedirectUrl('/home')
                            window.location.reload()
                        } else {
                            setRedirectUrl('/')
                            window.location.reload()
                        }
                    } else {
                        alert("Đăng nhập không thành công")
                    }
                }).catch(err => {
                err.response && err.response.data && err.response.data.msg && alert(err.response.data.msg)
            })
        } else {
            alert('Vui lòng nhập username password');
        }
    }

    return (
        <Container fluid>
            {
                redirectUrl
                &&
                <Redirect
                    to={redirectUrl}
                />
            }
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    {isLogin &&<h2>Login</h2>}
                                    {isRegister && <h2>Register</h2>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="login_part section_padding ">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="login_part_text text-center">
                                <div className="login_part_text_iner">
                                    <h2>New to our Shop?</h2>
                                    <p>There are advances being made in science and technology
                                        everyday, and a good example of this is the</p>
                                    <a href="/register" className="btn_3">Create an Account</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="login_part_form">
                                <div className="login_part_form_iner">
                                    <h3>Welcome Back !
                                        Please Sign in now</h3>
                                    <div className="row contact_form">
                                        {isRegister && <div className="col-md-12 form-group p_star">
                                            <input type="text" id="name" name="name" className="form-control"
                                                   placeholder="First and last name"
                                                   required={true}
                                                   value={name}
                                                   onChange={e => setName(e.target.value)}
                                            />
                                        </div>}
                                        <div className="col-md-12 form-group p_star">
                                            <input type="text" id="username" name="username" className="form-control"
                                                   placeholder="Username"
                                                   required={true}
                                                   value={username}
                                                   onChange={e => setUsername(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-12 form-group p_star">
                                            <input type="password" id="password" name="password" className="form-control"
                                                   placeholder="Password"
                                                   required={true}
                                                   value={password}
                                                   onChange={e => setPass(e.target.value)}
                                            />
                                        </div>
                                        {isRegister && <div className="col-md-12 form-group p_star">
                                            <input type="password" id="cpassword" name="cpassword" className="form-control"
                                                   placeholder="Confirm password"
                                                   required={true}
                                                   value={cpassword}
                                                   onChange={e => setConPass(e.target.value)}
                                            />
                                        </div>}
                                        <div className="col-md-12 form-group">
                                            {isLogin && <button className="btn_3" type="submit" id="btnLog"
                                                                onClick={login}>Sign in
                                            </button>}
                                            {isRegister && <button className="btn_3" type="submit" id="btnReg"
                                                                   onClick={register}>Sign up
                                            </button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default withRouter(Login);
