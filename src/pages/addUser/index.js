import React, {useEffect, useState} from "react";
import {Container, Col, Row} from "reactstrap";
import Request from "../../utils/request";

function AddUser(props) {
    console.log(props)
    const idUser = props.match.params.id;

    const [data, setData] = useState([])
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [isAdmin, setAdmin] = useState(false);

    const submit = e => {
        e.preventDefault()
        Request.post('http://localhost:4000/user', {name, username, isAdmin, password})
        window.location.replace('http://localhost:3000/user');
    }

    const getUserById = async () => {
        const {data} = await Request.get('http://localhost:4000/user/' + idUser);
        setData(data)
    };

    const updateUser = e => {
        e.preventDefault()
        Request.put('http://localhost:4000/user/' + idUser,{name, username, isAdmin, password})
        window.location.replace('http://localhost:3000/user');
    }

    useEffect( () => {
        getUserById();
    }, []);

    return (
        <Container fluid>
            <Container className="comment-form" fluid>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <h2 className="title-side text-center">Thêm người dùng</h2>
                    <div>
                        <h3 htmlFor="fname">Họ tên</h3>
                        <input type="text" id="name" name="name" placeholder="Họ tên người dùng"
                               required="required"
                               value={data.name}
                               onChange={e => setName(e.target.value)}
                        />

                        <h3 htmlFor="lname">Username</h3>
                        <input type="text" id="uname" name="username" placeholder="Tên đăng nhập"
                               required="required"
                               value={data.username}
                               onChange={e => setUsername(e.target.value)}
                        />

                        <h3 htmlFor="lname">Password ( tối thiểu 6 kí tự )</h3>
                        <input type="text" id="pass" name="password" placeholder="Mật khẩu"
                               required="required"
                               value={data.password}
                               onChange={e => setPass(e.target.value)}
                        />

                        <h3 htmlFor="">Check admin</h3>
                        <label className="checkbox">
                            <input type="checkbox" value="true" id="isadmin" name="isAdmin"
                                   onChange={e => setAdmin(JSON.parse(e.target.value))}/> Check admin
                        </label>

                        <button type="button" className="btn-custom btn-comment-form" onClick={submit}>
                            Thêm
                        </button>
                        <button type="button" className="btn-custom btn-comment-form" onClick={updateUser}>
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
