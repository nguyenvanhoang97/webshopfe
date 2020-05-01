import React, {useEffect, useState} from "react";
import {Container, Col, Table} from "reactstrap";
import "./homeadmin.css"
import * as axios from "axios";
import {Button} from "react-bootstrap";

function HomeAdmin() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await axios("http://localhost:4000/product");
        console.log(data);
        setData(data);
    };

    useEffect(async () => {
        getData();
    }, []);

    const dataProducts = (product, index) => {
        return (
            <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td><img className="image-table" src={product.image}/></td>
                <td>{product.url}</td>
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
                <h2 className="title-side text-center">Danh mục sản phẩm</h2>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Table className="table">
                        <thead>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên sản phẩm</th>
                        <th className="text-center">Ảnh minh họa</th>
                        <th className="text-center">Image</th>
                        <th></th>
                        </thead>
                        <tbody>
                            {data.map(dataProducts)}
                        </tbody>
                    </Table>
                    <Button href="/add/product" className="btn-custom">Thêm Sản Phẩm</Button>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    )
}

export default HomeAdmin;