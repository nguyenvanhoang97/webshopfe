import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import Request from "../../utils/request";

function CheckOut() {

    let total = 0
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
                console.log(data)
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

    cart.forEach((order) => {
        total += order.idProduct.price * order.amount
    });

    const dataOrder = (order, index) => {
        return (
            <tr style={{fontSize: '14px'}} key={index}>
                <td style={{width: '45%'}} className="text-center">{order.idProduct.name}</td>
                <td style={{width: '25%'}} className="text-center">{order.amount}</td>
                <td style={{width: '30%'}} className="text-center">{order.idProduct.price * order.amount} vnd</td>
            </tr>
        )
    }

    return (
        <Container fluid>
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Checkout</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="checkout_area section_padding">
                <div className="container">
                    <div className="billing_details">
                        <div className="row">
                            <div className="col-lg-7">
                                <h3>Billing Details</h3>
                                <form className="row contact_form" action="#" method="post" noValidate="novalidate">
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" id="name" name="name" placeholder="Họ và tên"
                                               className="form-control"
                                               required={true}
                                               value={name}
                                               onChange={e => setName(e.target.value)}/>
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" id="address" name="address" placeholder="Địa chỉ"
                                               className="form-control"
                                               required={true}
                                               value={address}
                                               onChange={e => setAddress(e.target.value)}/>
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" id="city" name="city" placeholder="Tỉnh / thành phố"
                                               className="form-control"
                                               required={true}
                                               value={city}
                                               onChange={e => setCity(e.target.value)}/>
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" id="phone" name="phone" placeholder="Số điện thoại"
                                               className="form-control"
                                               required={true}
                                               value={phone}
                                               onChange={e => setPhone(e.target.value)}/>
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" id="email" name="email" placeholder="Địa chỉ email"
                                               className="form-control"
                                               required={true}
                                               value={email}
                                               onChange={e => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <textarea id="note" name="note" placeholder="Ghi chú: vd ( Thời gian nhận hàng, chỉ dẫn địa chỉ )"
                                                  className="form-control"
                                                  required={true}
                                                  value={note}
                                                  onChange={e => setNote(e.target.value)}/>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-5">
                                <div className="order_box">
                                    <h2>Your Order</h2>
                                    <table className="table" style={{border: 'none'}}>
                                        <thead>
                                        <tr>
                                            <th style={{ fontSize: '12px'}} className="text-center" scope="col">Product</th>
                                            <th style={{ fontSize: '12px'}} className="text-center" scope="col">Amount</th>
                                            <th style={{ fontSize: '12px'}} className="text-center" scope="col">Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {cart.map(dataOrder)}
                                        <tr>
                                            <td></td>
                                            <td>
                                                Total
                                            </td>
                                            <td>
                                                {total} vnd
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <button className="btn" style={{width: '100%'}} onClick={addOrder}>Proceed to Paypal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
}
export default CheckOut;
