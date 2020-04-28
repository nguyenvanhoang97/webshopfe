import React, {useEffect, useState} from "react";
import {Container, Col, Table, Button} from "reactstrap";
import * as axios from "axios";

function UserContent() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await axios("http://localhost:4000/user");
        console.log(data);
        setData(data);
    };

    useEffect(async () => {
        getData();
    }, []);

    const dataUser = (user, index) => {
        return (
            <tr key={index}>
                <td>{user.id}</td>
                <td>{user.title}</td>
                <td>{user.thumbnailUrl}</td>
                <td>{user.url}</td>
                <td>
                    <button className="btn-custom">Edit</button>
                    <button className="btn-custom">Delete</button>
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
                    <Button className="btn-custom" href="/adduser">Thêm người dùng</Button>
                </Col>
                <Col sm={2}></Col>
            </Container>
        </Container>
    )
}

export default UserContent;
