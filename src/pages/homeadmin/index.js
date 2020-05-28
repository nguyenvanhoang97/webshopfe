import React, {useEffect, useState} from "react";
import {Container, Col, Table} from "reactstrap";
import Moment from 'react-moment';
import 'moment-timezone';
import "./index.css"
import {Button} from "react-bootstrap";
import Request from "../../utils/request";

function HomeAdmin() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await Request.get('http://localhost:4000/product')
        console.log(data)
        setData(data);
    };

    useEffect( () => {
        getData();
    }, []);

    const removeProduct = async (idProduct) => {
        Request.delete('http://localhost:4000/product/'+ idProduct)
        window.location.reload();
    };

    const editProduct = async (idProduct) => {
        window.location.replace('http://localhost:3000/edit/product/'+ idProduct);
    };

    const dataProducts = (product, index) => {
        return (
            <tr key={index}>
                <td className="text-center hidden">{product._id}</td>
                <td className="text-center"></td>
                <td className="text-center">{product.name}</td>
                <td className="text-center"><img className="image-table" src={product.image.indexOf('http')===0?product.image:`http://localhost:4000/file/${product.image}`}/></td>
                <td className="text-center">{product.price} vnđ</td>
                <td className="text-center">{product.amount}</td>
                <td className="text-center"><Moment>{product.dateCreate}</Moment></td>
                <td className="text-center"><Moment>{product.dateUpdate}</Moment></td>
                <td className="text-center">
                    <button className="btn-custom" onClick={() => editProduct(product._id)}>Edit</button>
                    <button className="btn-custom" onClick={() => removeProduct(product._id)}>Delete</button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid>
            <Container fluid className="comment-form">
                <h2 className="title-side text-center">Danh mục sản phẩm</h2>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <th style={{width: '5%'}} className="text-center">STT</th>
                        <th style={{width: '15%'}} className="text-center">Tên sản phẩm</th>
                        <th style={{width: '20%'}} className="text-center">Ảnh minh họa</th>
                        <th style={{width: '12%'}} className="text-center">Giá cả</th>
                        <th style={{width: '12%'}} className="text-center">Số lượng</th>
                        <th style={{width: '12%'}} className="text-center">Ngày tạo</th>
                        <th style={{width: '12%'}} className="text-center">Ngày cập nhật</th>
                        <th style={{width: '11%'}} className="table-search text-center">
                            <input />
                            <button className="btn-custom">Search</button>
                        </th>
                        </thead>
                        <tbody>
                        {data.map(dataProducts)}
                        </tbody>
                    </Table>
                    <Button href="/add/product" className="btn-custom btn-comment-form">Thêm Sản Phẩm</Button>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    )
}

export default HomeAdmin;
