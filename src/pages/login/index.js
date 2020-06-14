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
                    if (response.ok === false) {
                        alert("Dang ky khong thanh cong")
                    } else {
                        alert("Dang ky thanh cong")
                        window.location.replace("/login")
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
                    if (data.ok === true) {
                        localStorage.setItem("token", data.token)
                        localStorage.setItem("isAdmin", data.user.isAdmin ? 1 : 0)
                        if (data.user.isAdmin) {
                            setRedirectUrl('/home')
                        } else {
                            setRedirectUrl('/')
                        }
                    } else {
                        alert("Đăng nhập không thành công")
                    }
                }).catch(err => {
                err.response && err.response.data && err.response.data.msg && alert(err.response.data.msg)
            })
        } else {
            alert('Nhập username password');
        }
    }

    return (
        <Container fluid style={{minHeight: '57vh'}}>
            {
                redirectUrl
                &&
                <Redirect
                    to={redirectUrl}
                />
            }
            <Container fluid>
                <div className="wrapper">
                    <form className="form-signin">
                        {isLogin && <h2 className="title text-center">LOGIN</h2>}
                        {isRegister && <h2 className="title text-center">REGISTER</h2>}
                        {isRegister && <input type="text" id="name" name="name" className="form-control"
                                              placeholder="Tên người dùng"
                                              required={true}
                                              value={name}
                                              onChange={e => setName(e.target.value)}
                        />}
                        <input type="text" id="username" name="username" className="form-control"
                               placeholder="Tên đăng nhập"
                               required={true}
                               value={username}
                               onChange={e => setUsername(e.target.value)}
                        />
                        <input type="password" id="password" name="password" className="form-control"
                               placeholder="Mật khẩu"
                               required={true}
                               value={password}
                               onChange={e => setPass(e.target.value)}
                        />
                        {isRegister && <input type="password" id="cpassword" name="conpass" className="form-control"
                                              placeholder="Xác nhận mật khẩu"
                                              required={true}
                                              value={cpassword}
                                              onChange={e => setConPass(e.target.value)}
                        />}

                        {isLogin && <button className="btn btn-lg btn-block btn-signin" type="submit" id="btnLog"
                                            onClick={login}>Đăng nhập
                        </button>}
                        {isRegister && <button className="btn btn-lg btn-block btn-signin" type="submit" id="btnReg"
                                               onClick={register}>Đăng ký
                        </button>}
                    </form>
                </div>
            </Container>
        </Container>
    )
}

export default withRouter(Login);
