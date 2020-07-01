import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import Request from "../../utils/request";

function ContentCart() {
    let total = 0
    const [cart, setCart] = useState([]);
    const [amount, setAmount] = useState(1);

    const getData = async () => {
        await Request.get("cart")
            .then( function (response) {
                const {data} = response
                if (response.status === 200) {
                    const cart = data.carts
                    setCart(cart)
                } else {
                    alert("Bạn chưa đăng nhập")
                }
            }).catch(err => {
                alert("Bạn chưa đăng nhập")
                window.location.replace("/login")
            })
    };

    useEffect( () => {
        getData();
    }, []);

    const removeCart = async (id) => {
        await Request.delete('cart/'+ id)
        window.location.reload()
    };

    const plusAmount = async () => {
        setAmount(amount+1)
    };

    const minusAmount = async () => {
        setAmount(amount-1)
    };

    cart.forEach((product) => {
        total += product.idProduct.price * product.amount
    });

    const dataProducts = (product, index) => {
        return (
            <tr key={index}>
                <td>
                    <div className="media">
                        <div className="d-flex">
                            <img style={{width:'150px', height: '150px'}} src={product.idProduct.image.indexOf('http')===0?product.idProduct.image:`http://localhost:4000/file/${product.idProduct.image}`}/>
                        </div>
                        <div className="media-body">
                            <p>{product.idProduct.name}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <h5>{product.idProduct.price} vnd</h5>
                </td>
                <td>
                    <span onClick={() => removeCart(product._id)}>Remove</span>
                </td>
                <td>
                    <div className="product_count">
                        <span style={{border: 'none'}} className="input-number-decrement" onClick={() => minusAmount()}> <i className="ti-minus"></i></span>
                        <input className="input-number" type="text" value={product.amount} min={1} max={10}
                               onChange={e => setAmount(e.target.value)}/>
                        <span style={{border: 'none'}} className="input-number-increment" onClick={() => plusAmount()}> <i className="ti-plus"></i></span>
                    </div>
                </td>
                <td>
                    <h5>{product.idProduct.price * product.amount}</h5>
                </td>
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
                                    <h2>Cart List</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="cart_area section_padding">
                <div className="container">
                    <div className="cart_inner">
                        <div className="table-responsive">
                            <table className="table" style={{border: 'none'}}>
                                <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col"></th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cart.map(dataProducts)}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <h5>Total</h5>
                                    </td>
                                    <td>
                                        <h5>{total} vnd</h5>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="checkout_btn_inner float-right">
                                <a className="btn_1" href="/shop">Continue Shopping</a>
                                <a className="btn_1 checkout_btn_1" href="/checkout">Proceed to checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
}
export default ContentCart;
