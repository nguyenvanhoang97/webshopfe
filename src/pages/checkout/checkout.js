import React, {useEffect, useState} from "react";
import {Container, Col, Table} from "reactstrap";
import Request from "../../utils/request";

function CheckOut() {
    const [cart, setCart] = useState([]);
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [note, setNote] = useState();

    const getData = async () => {
        await Request.get("cart")
            .then( function (response) {
                const {data} = response
                if (data.carts.length > 0) {
                    const cart = data.carts
                    setCart(cart)
                } else {
                    alert("Giỏ hàng trống quay lại mua hàng")
                    window.location.replace("/")
                }
            })
    };

    const addOrder = async (e) => {
        e.preventDefault()
        await Request.post('order', {name, address, city, phone, email, note})
            .then( function (response) {
                if (response.status === 200) {
                    alert("Đặt hàng thành công quay lại trang chủ")
                    window.location.replace("/")
                }
            })
    }

    useEffect( () => {
        getData();
    }, []);

    const dataOrder = (order, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{order.idProduct.name}</td>
                <td className="text-center">{order.idProduct.price}</td>
                <td className="text-center">{order.amount}</td>
            </tr>
        )
    }

    return (
        <Container fluid className="container-body">
            <Container fluid className="comment-form">
                <h2 className="text-center title-side">Thanh toán</h2>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Col sm={4}>
                        <h4 className="text-center title-side">Thông tin thanh toán</h4>

                        <label htmlFor="name">Họ tên</label>
                        <input type="text" id="name" name="name" placeholder="Họ và tên"
                               required={true}
                               value={name}
                               onChange={e => setName(e.target.value)}/>

                        <label htmlFor="address">Địa chỉ</label>
                        <input type="text" id="address" name="address" placeholder="Địa chỉ"
                               required={true}
                               value={address}
                               onChange={e => setAddress(e.target.value)}/>

                        <label htmlFor="city">Tỉnh / Thành phố</label>
                        <input type="text" id="city" name="city" placeholder="Tỉnh / thành phố"
                               required={true}
                               value={city}
                               onChange={e => setCity(e.target.value)}/>

                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="text" id="phone" name="phone" placeholder="Số điện thoại"
                               required={true}
                               value={phone}
                               onChange={e => setPhone(e.target.value)}/>

                        <label htmlFor="email">Địa chỉ email</label>
                        <input type="text" id="email" name="email" placeholder="Địa chỉ email"
                               required={true}
                               value={email}
                               onChange={e => setEmail(e.target.value)}/>

                    </Col>
                    <Col sm={4} className="shopping-cart">
                        <h4 className="text-center title-side">Thông tin bổ sung</h4>
                        <label htmlFor="subject">Ghi chú về đơn hàng</label>
                        <textarea id="note" name="note" placeholder="Ghi chú: vd ( Thời gian nhận hàng, chỉ dẫn địa chỉ )"
                                  required={true}
                                  value={note}
                                  onChange={e => setNote(e.target.value)}/>
                    </Col>
                    <Col sm={4}>
                        <h4 className="text-center title-side">Đơn hàng</h4>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <th style={{width: '50%'}} className="text-center">Tên</th>
                                <th style={{width: '30%'}} className="text-center">Gia</th>
                                <th style={{width: '20%'}} className="text-center">So luong</th>
                            </thead>
                            <tbody>
                            {cart.map(dataOrder)}
                            </tbody>
                        </Table>
                        <button className="btn-custom btn-comment-form" onClick={addOrder}>Đặt hàng</button>
                    </Col>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    );
}
export default CheckOut;
