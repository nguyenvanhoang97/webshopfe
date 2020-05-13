import React, {useEffect, useState} from "react";
import {Container, Col, Table, Button} from "reactstrap";
import * as axios from "axios";
import {Redirect} from "react-router-dom";

function UserContent() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await axios("http://localhost:4000/user");
        setData(data);
    };

    useEffect( () => {
        getData();
    }, []);

    const removeUser = async (idUser) => {
        await axios({
            method: 'delete',
            url: 'http://localhost:4000/user/' + idUser
        });
        window.location.reload();
    };

    const editUser = async (idUser) => {
        window.location.replace('http://localhost:3000/edit/user/'+ idUser);
    };

    const dataUser = (user, index) => {
        return (
            <tr key={index}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                    <button className="btn-custom" onClick={() => editUser(user._id)}>Edit</button>
                    <button className="btn-custom" onClick={() => removeUser(user._id)}>Delete</button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid>
            <Container fluid className="">
                <h2 className="title-side text-center">Danh mục người dùng</h2>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <Table className="table">
                        <thead>
                            <th className="text-center">ID</th>
                            <th className="text-center">Title</th>
                            <th className="text-center">Image</th>
                            <th className="text-center">Image</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {data.map(dataUser)}
                        </tbody>
                    </Table>
                    <Button className="btn-custom" href="/add/user">Thêm người dùng</Button>
                </Col>
                <Col sm={2}></Col>
            </Container>
        </Container>
    )
}

export default UserContent;
