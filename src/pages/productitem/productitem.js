import React, {useEffect, useState} from "react";
import * as axios from '../request/index'
import "./productitem.css"
import {Container, Row, Col} from "reactstrap";

function ProductItem(props) {
    const [data, setData] = useState([]);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [comment, setComment] = useState();
    const [dataComment, setDataComment] = useState([]);
    const id_product = props.match.params.id;

    const getProductId = async () => {
        const {data} = await axios('http://localhost:4000/product/' + id_product);
        setData(data);
    };

    const getComment = async () => {
        const {data} = await axios('http://localhost:4000/comment/' + id_product);
        console.log(data)
        setDataComment(data);
    };

    const addComment = e => {
        e.preventDefault()

        axios.post("http://localhost:4000/comment",
            {
                id_product, name, email, comment
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
        window.location.reload();
    }

    const addToCart = e => {
        e.preventDefault()

        axios.post("http://localhost:4000/cart",
            {
                id_product
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

    useEffect(() => {
        getProductId();
        getComment();
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
                    <Col sm={3}></Col>
                    <Col className="comment" sm={6}>
                        <h2 className="title-side text-center">Đánh giá</h2>
                        <div>
                            {
                                dataComment.map((comment, index) => {
                                    return (
                                        <Row>
                                            <div className="comment-main-level">
                                                <div className="comment-avatar"><img
                                                    src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg"
                                                    alt=""/></div>
                                                <div className="comment-box">
                                                    <div className="comment-head">
                                                        <h6 className="comment-name"><a
                                                            href="http://creaticode.com/blog">{comment.name}</a></h6>
                                                        <span>{comment.dateCreate}</span>
                                                    </div>
                                                    <div className="comment-content">
                                                        {comment.comment}
                                                    </div>
                                                </div>
                                            </div>
                                        </Row>
                                    );
                                })
                            }
                        </div>
                        <div >
                            <input className="hidden" type="text" id="idProduct" name="" placeholder=""/>
                            <label htmlFor="fname">Họ tên</label>
                            <input type="text" id="name" name="name" placeholder="Họ tên"
                                   required="required"
                                   value={name}
                                   onChange={e => setName(e.target.value)}
                            />

                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" placeholder="Email"
                                   required="required"
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                            />

                            <label htmlFor="subject">Comment</label>
                            <textarea id="subject" name="subject" placeholder="Write something.."
                                      required="required"
                                      value={comment}
                                      onChange={e => setComment(e.target.value)}>
                            </textarea>
                            <button type="submit" className="btn-custom" onClick={addComment}>
                                Submit
                            </button>
                        </div>
                    </Col>
                    <Col sm={3}></Col>
                </Container>
            </Container>
        </Container>
    )
}

export default ProductItem;
