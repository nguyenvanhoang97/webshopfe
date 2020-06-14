import React, {useEffect, useState} from "react";
import "./index.css";
import {Container, Row, Col, Table} from "reactstrap";
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
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{product.idProduct.name}</td>
                <td className="text-center"><img className="image-table" src={product.idProduct.image.indexOf('http')===0?product.idProduct.image:`http://localhost:4000/file/${product.idProduct.image}`}/></td>
                <td className="text-center">{product.idProduct.price}</td>
                <td className="text-center">
                    <input className="product-quantity-input" type="number" value="1" min="1"
                           value={product.amount}
                           onChange={e => setAmount(e.target.value)}/>
                </td>
                <td className="text-center">
                    <button className="btn-custom" onClick={() => removeCart(product._id)}>Remove</button>
                </td>
                <td className="text-center">{product.amount * product.idProduct.price}</td>
            </tr>
        )
    }
    return (
        <Container fluid className="container-body">
            <Container fluid className="comment-form">
                <h2 className="text-center title-side">Shopping Cart</h2>
                <Col sm={1}></Col>
                <Col sm={10} className="shopping-cart">
                    <div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <th style={{width: '5%'}} className="text-center">STT</th>
                            <th style={{width: '15%'}} className="text-center">Tên sản phẩm</th>
                            <th style={{width: '25%'}} className="text-center">Hình ảnh</th>
                            <th style={{width: '10%'}} className="text-center">Giá</th>
                            <th style={{width: '10%'}} className="text-center">Số lượng</th>
                            <th style={{width: '10%'}} className="text-center"></th>
                            <th style={{width: '10%'}} className="text-center">Tổng</th>
                            </thead>
                            <tbody>
                            {cart.map(dataProducts)}
                            </tbody>
                        </Table>
                    </div>
                    <Row className="total-product">
                        <div className="totals">

                        </div>
                        <button className="btn-custom btn-comment-form"><a href={"/checkout"}>Check out</a></button>
                    </Row>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    );
}
export default ContentCart;
