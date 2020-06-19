import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import Request from "../../utils/request";

function ContentCart() {
    const [cart, setCart] = useState([]);
    const [amount, setAmount] = useState();

    const getData = async () => {
        await Request.get("cart")
            .then( function (response) {
                const {data} = response
                console.log(data)
                if (response.status === 200) {
                    const cart = data.carts
                    setCart(cart)
                } else {
                    alert("Ban chua dang nhap")
                }
            }).catch(err => {
                alert("Ban chua dang nhap")
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

    const dataProducts = (product, index) => {
        return (
            <tr key={index}>
                <td>
                    <div className="media">
                        <div className="d-flex">
                            <img src={product.idProduct.image.indexOf('http')===0?product.idProduct.image:`http://localhost:4000/file/${product.idProduct.image}`}/>
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
                        <input className="product-quantity-input" type="number" value="1" min="1"
                               value={product.amount}
                               onChange={e => setAmount(e.target.value)}/>
                    </div>
                </td>
                <td>
                    <h5>{product.idProduct.price * product.idProduct.amount}</h5>
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
                                        <h5>Subtotal</h5>
                                    </td>
                                    <td>
                                        <h5>$2160.00</h5>
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
