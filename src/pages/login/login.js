import React, {useState} from "react";
import {Container} from "reactstrap"
import "./login.css"
import * as axios from "axios";

function Login(props) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [cpassword, setConPass] = useState('');
    const register = e => {
        if (cpassword === password) {
            e.preventDefault()
            axios.post("http://localhost:4000/user",
                {
                    name, username, password
                }
            )
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {

        }
    }

    const login = e => {
        e.preventDefault()
        axios.post("http://localhost:4000/user/login",
            {
                username, password
            }
        )
            .then(function (response) {
                console.log(response);
                if (response.data !== null) {

                } else {

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        <Container fluid>
            <Container fluid>
                <div className="wrapper">
                    <form className="form-signin">
                        <h2 className="title text-center">LOGIN</h2>
                        <h2 className="title text-center">REGISTER</h2>
                        <input type="text" id="name" name="name" className="form-control" placeholder="Tên người dùng"
                               required="required"
                               value={name}
                               onChange={e => setName(e.target.value)}
                        />
                        <input type="text" id="username" name="username" className="form-control" placeholder="Tên đăng nhập"
                               required="required"
                               value={username}
                               onChange={e => setUsername(e.target.value)}
                        />
                        <input type="password" id="password" name="password" className="form-control" placeholder="Mật khẩu"
                               required="required"
                               value={password}
                               onChange={e => setPass(e.target.value)}
                        />
                        <input type="password" id="cpassword" name="conpass" className="form-control" placeholder="Xác nhận mật khẩu"
                               required="required"
                               value={cpassword}
                               onChange={e => setConPass(e.target.value)}
                        />
                        <label className="checkbox">
                            <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
                        </label>

                        <button className="btn btn-lg btn-block btn-signin" type="submit" id="btnLog" onClick={login}>Đăng nhập</button>
                        <button className="btn btn-lg btn-block btn-signin" type="submit" id="btnReg" onClick={register}>Đăng ký</button>
                    </form>
                </div>
            </Container>
        </Container>
    )
}

export default Login;
