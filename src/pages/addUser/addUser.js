import React, {useEffect, useState} from "react";
import {Container, Col} from "reactstrap";
import * as axios from 'axios'

function AddUser(props) {
    console.log(props)
    const idUser = props.match.params.id;
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [isAdmin, setAdmin] = useState(false);
    const submit = e => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: 'http://localhost:4000/user',
            data: {name, username, isAdmin, password},
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            json: true
        });
        window.location.replace('http://localhost:3000/user');
    }

    const getUserById = async () => {
        const {data} = await axios('http://localhost:4000/user/' + idUser);
        console.log(data)
    };

    const updateUser = e => {
        e.preventDefault()

        axios({
            method: 'PUT',
            url: 'http://localhost:4000/user/' + idUser,
            data: {name, username, isAdmin, password},
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            json: true
        })
    }

    useEffect( () => {
        getUserById();
    }, []);

    return (
        <Container fluid>
            <Container fluid>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <h2 className="title-side text-center">Thêm người dùng</h2>
                    <div>
                        <label htmlFor="fname">Họ tên</label>
                        <input type="text" id="name" name="name" placeholder="Họ tên người dùng"
                               required="required"
                               value={name}
                               onChange={e => setName(e.target.value)}
                        />

                        <label htmlFor="lname">Username</label>
                        <input type="text" id="uname" name="username" placeholder="Tên đăng nhập"
                               required="required"
                               value={username}
                               onChange={e => setUsername(e.target.value)}
                        />

                        <label htmlFor="lname">Password ( tối thiểu 6 kí tự )</label>
                        <input type="text" id="pass" name="password" placeholder="Mật khẩu"
                               required="required"
                               value={password}
                               onChange={e => setPass(e.target.value)}
                        />

                        <label className="checkbox">
                            <input type="checkbox" value="true" id="isadmin" name="isAdmin"
                                   onChange={e => setAdmin(JSON.parse(e.target.value))}/> Check admin
                        </label>

                        <button type="button" className="btn-custom" onClick={submit}>
                            Thêm Admin
                        </button>
                        <button type="button" className="btn-custom" onClick={updateUser}>
                            Sửa
                        </button>
                    </div>
                </Col>
                <Col sm={2}></Col>
            </Container>
        </Container>
    )
}

export default AddUser;
