import React, {  } from "react";
import "./cart.css";
import {Container, Row, Col} from "reactstrap";

function ContentCart(props) {

    console.log(props)

    const dataProducts = (product, index) => {
        return (
            <tr key={index}>
                <td></td>
                <td>{product.name}</td>
                <td>{product.image}</td>
                <td>{product.price}</td>
                <td>
                    <input className="product-quantity-input" type="number" value="1" min="1"/>
                </td>
                <td>
                    <button className="btn-custom">Remove</button>
                </td>
                <td></td>
            </tr>
        )
    }
    return (
        <Container fluid>
            <Container fluid className="content-cart">
                <h2 className="text-center title-side">Shopping Cart</h2>
                <Col sm={2}></Col>
                <Col sm={8} className="shopping-cart">
                    <div>
                        <table className="table">
                            <thead>
                                <th className="text-center col-sm-1">STT</th>
                                <th className="text-center col-sm-3">Tên sản phẩm</th>
                                <th className="text-center col-sm-4">Hình ảnh</th>
                                <th className="text-center col-sm-1">Giá</th>
                                <th className="col-sm-1">Số lượng</th>
                                <th className="col-sm-1"></th>
                                <th className="col-sm-1">Tổng</th>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <Row className="total-product">
                        <div className="totals">

                        </div>
                        <button className="checkout btn-custom">Checkout</button>
                    </Row>
                </Col>
                <Col sm={2}></Col>
            </Container>
        </Container>
    );
}
export default ContentCart;
