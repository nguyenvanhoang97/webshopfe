import React, {  } from "react";
import {Container, Col} from "reactstrap";

function CheckOut() {

    const dataOrder = (order, index) => {
        return (
            <tr key={index}>
                <td>{order.name}</td>
                <td>{order.amount}</td>
                <td>{order.price}</td>
            </tr>
        )
    }

    return (
        <Container fluid>
            <Container fluid className="content-cart">
                <h2 className="text-center title-side">Thanh toán</h2>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Col sm={4}>
                        <h4 className="text-center title-side">Thông tin thanh toán</h4>

                        <label htmlFor="name">Họ tên</label>
                        <input type="text" id="name" name="name" placeholder="Họ và tên"/>

                        <label htmlFor="company">Công ty ( tùy chọn )</label>
                        <input type="text" id="company" name="company" placeholder="Công ty"/>

                        <label htmlFor="address">Địa chỉ</label>
                        <input type="text" id="address" name="address" placeholder="Địa chỉ"/>

                        <label htmlFor="city">Tỉnh / Thành phố</label>
                        <input type="text" id="city" name="city" placeholder="Tỉnh / thành phố"/>

                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="text" id="phone" name="phone" placeholder="Số điện thoại"/>

                        <label htmlFor="email">Địa chỉ email</label>
                        <input type="text" id="email" name="email" placeholder="Địa chỉ email"/>

                    </Col>
                    <Col sm={4} className="shopping-cart">
                        <h4 className="text-center title-side">Thông tin bổ sung</h4>
                        <label htmlFor="subject">Ghi chú về đơn hàng</label>
                        <textarea id="note" name="note" placeholder="Ghi chú: vd ( Thời gian nhận hàng, chỉ dẫn địa chỉ )"/>
                    </Col>
                    <Col sm={4}>
                        <h4 className="text-center title-side">Đơn hàng</h4>
                        <table className="table">
                            <thead>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Số lượng</th>
                                <th className="text-center">Giá</th>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                        <button className="btn-custom">Đặt hàng</button>
                    </Col>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    );
}
export default CheckOut;
