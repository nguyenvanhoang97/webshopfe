import React, {useEffect, useState} from "react";
import * as axios from 'axios'
import "./productitem.css"
import {Container, Row, Col} from "reactstrap";

function ProductItem(props) {
    const [data, setData] = useState([]);
    console.log(props)
    const idProduct = props.match.params.id;
    const idUser = props.match.params.id;

    const getData = async () => {
        const {data} = await axios('http://localhost:4000/product/' + idProduct);
        setData(data);
    };

    const addToCart = e => {
        e.preventDefault()

        axios.post("http://localhost:4000/cart",
            {
                idProduct, idUser
            }
        )
            .then(function (response) {
                console.log(response);
                if (response) {

                } else {

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(async () => {
        getData();
    }, []);


    return(
        <Container fluid>
            <Container fluid>
                <div>
                    <Col sm={2}></Col>
                    <Col sm={8} className="product-details">
                        {
                            <Row>
                                <Col sm={8} className="product-details-image">
                                    <div className="image-product-detail">
                                        <img alt={data.name} key={data.id}
                                             className="image-product-detail"
                                             src={data.image}/>
                                    </div>
                                </Col>
                                <Col sm={4} className="details">
                                    <h3 className="title-side">{data.name}</h3>
                                    <div className="rating">
                                        <div className="stars">
                                        </div>
                                    </div>
                                    <h3 className="">Giá: {data.price} <span></span></h3>
                                    <h4 className="">Mô tả: {data.description} <span></span></h4>
                                    <div className="action">
                                        <button className="btn btn-default btn-custom" type="button"
                                            onClick={addToCart}>add to cart</button>
                                    </div>
                                </Col>
                            </Row>
                        }
                    </Col>
                    <Col sm={2}></Col>
                </div>
                <Container fluid>
                    <Col sm={4}></Col>
                    <Col className="comment" sm={4}>
                        <h2 className="title-side text-center">Đánh giá</h2>
                        <div>
                            <label htmlFor="fname">Bình luận</label>
                        </div>
                        <form >
                            <input className="hidden" type="text" id="idProduct" name="" placeholder=""/>
                            <label htmlFor="fname">First Name</label>
                            <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

                            <label htmlFor="fname">Email</label>
                            <input type="text" id="email" name="email" placeholder="Your email.."/>

                            <label htmlFor="subject">Comment</label>
                            <textarea id="subject" name="subject" placeholder="Write something.."></textarea>
                            <button type="submit" className="btn-custom">
                                Submit
                            </button>
                        </form>
                    </Col>
                    <Col sm={4}></Col>
                </Container>
            </Container>
        </Container>
    )
}

export default ProductItem;
