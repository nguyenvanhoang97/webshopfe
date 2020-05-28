import React, {useEffect, useState} from "react";
import {Container, Col, Table, Button} from "reactstrap";
import Request from "../../utils/request";
import Moment from 'react-moment';
import 'moment-timezone';

function OrderContent() {

    const dataOrder = (order, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{order._id}</td>
                <td className="text-center">{order.name}</td>
                <td className="text-center">{order.company}</td>
                <td className="text-center">{order.address}</td>
                <td className="text-center">{order.phone}</td>
                <td className="text-center">{order.email}</td>
                <td><img className="image-table" src={order.image.indexOf('http')===0?order.image:`http://localhost:4000/file/${order.image}`}/></td>
                <td className="text-center"><Moment>{order.dateCreate}</Moment></td>
                <td className="text-center"><Moment>{order.dateUpdate}</Moment></td>
                <td className="text-center">{order.note}</td>
                <td className="text-center">{order.status}</td>
                <td className="text-center">{order.tongtien}</td>
                <td className="text-center">
                    <button className="btn-custom" >Edit</button>
                    <button className="btn-custom" >Delete</button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid>
            <Container fluid className="comment-form">
                <h2 className="title-side text-center">Danh mục người dùng</h2>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <th style={{width: '3%'}} className="text-center">STT</th>
                        <th style={{width: '8%'}} className="text-center">Tên người nhận</th>
                        <th style={{width: '8%'}} className="text-center">Công ty</th>
                        <th style={{width: '8%'}} className="text-center">Địa chỉ</th>
                        <th style={{width: '8%'}} className="text-center">Số điện thoại</th>
                        <th style={{width: '8%'}} className="text-center">Email</th>
                        <th style={{width: '20%'}} className="text-center">Hình ảnh sản phẩm</th>
                        <th style={{width: '8%'}} className="text-center">Ngày tạo</th>
                        <th style={{width: '8%'}} className="text-center">Ngày cập nhật</th>
                        <th style={{width: '10%'}} className="text-center">Chú thích</th>
                        <th style={{width: '8%'}} className="text-center">Trạng thái</th>
                        <th style={{width: '10%'}} className="text-center">Tổng tiền</th>
                        <th style={{width: 'auto'}} className="table-search text-center">
                            <input />
                            <button className="btn-custom">Search</button>
                        </th>
                        </thead>
                        <tbody>

                        </tbody>
                    </Table>
                    <Button className="btn-custom btn-comment-form" href="/add/user">Thêm người dùng</Button>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    )
}

export default OrderContent;
