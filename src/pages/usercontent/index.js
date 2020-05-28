import React, {useEffect, useState} from "react";
import {Container, Col, Table, Button} from "reactstrap";
import Request from "../../utils/request";
import Moment from "react-moment";
import "moment-timezone"
import "./index.css"

function UserContent() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await Request.get("http://localhost:4000/user")
        console.log(data);
        setData(data)
    };

    useEffect( () => {
        getData();
    }, []);

    const removeUser = async (idUser) => {
        Request.delete('http://localhost:4000/user/' + idUser)
        window.location.reload();
    };

    const editUser = async (idUser) => {
        window.location.replace('http://localhost:3000/edit/user/'+ idUser);
    };

    const dataUser = (user, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{user._id}</td>
                <td className="text-center">{user.name}</td>
                <td className="text-center">{user.username}</td>
                <td className="text-center">{user.password}</td>
                <td className="text-center"><Moment>{user.dateCreate}</Moment></td>
                <td className="text-center"><Moment>{user.dateUpdate}</Moment></td>
                <td className="text-center">{user.isAdmin}</td>
                <td className="text-center">
                    <button className="btn-custom" onClick={() => editUser(user._id)}>
                        Edit
                    </button>
                    <button className="btn-custom" onClick={() => removeUser(user._id)}>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid>
            <Container fluid className="">
                <h2 className="title-side text-center">Danh mục người dùng</h2>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <th style={{width: '5%'}} className="text-center">STT</th>
                            <th style={{width: '20%'}} className="text-center">Tên người dùng</th>
                            <th style={{width: '20%'}} className="text-center">Tên đăng nhập</th>
                            <th style={{width: '20%'}} className="text-center">Mật khẩu</th>
                            <th style={{width: '10%'}} className="text-center">Ngày tạo</th>
                            <th style={{width: '10%'}} className="text-center">Ngày cập nhật</th>
                            <th style={{width: '10%'}} className="text-center">IsAdmin</th>
                            <th style={{width: '11%'}} className="table-search text-center">
                                <input />
                                <button className="btn-custom">Search</button>
                            </th>
                        </thead>
                        <tbody>
                        {data.map(dataUser)}
                        </tbody>
                    </Table>
                    <Button className="btn-custom btn-comment-form" href="/add/user">Thêm người dùng</Button>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    )
}

export default UserContent;
