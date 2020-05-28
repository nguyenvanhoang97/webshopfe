import React, {useEffect, useState} from "react";
import "./index.css"
import {Container, Row, Col} from "reactstrap";
import Request from "../../utils/request";

function ProductItem(props) {
    const [data, setData] = useState([]);
    const [dataComment, setDataComment] = useState([]);
    const [nameComment, setNameComment] = useState();
    const [email, setEmail] = useState();
    const [comment, setComment] = useState();
    const idProduct = props.match.params.id;

    const getProductId = async () => {
        const {data} = await Request.get('http://localhost:4000/product/' + idProduct)
        const dataComment = data.comments
        setDataComment(dataComment)
        console.log(dataComment);
        setData(data);
    };

    const addComment = e => {
        e.preventDefault()
        Request.put('http://localhost:4000/comment/' + idProduct, {nameComment, email, comment})
        window.location.reload();
    }

    const addToCart = e => {
        e.preventDefault()

    }

    useEffect( () => {
        getProductId();
    }, []);

    return (
        <Container fluid>
            <Container className="container-product" fluid>
                <h2 className="title-side text-center">Thông tin chi tiết sản phẩm</h2>
                <div>
                    <Col sm={2}></Col>
                    <Col sm={8} className="product-details">
                        {
                            <Row>
                                <Col sm={8} className="product-details-image">
                                    <div className="image-product-detail">
                                        <img alt={data.name} key={data._id}
                                             className="img-product"
                                             src={data.image===0?data.image:`http://localhost:4000/file/${data.image}`}/>
                                    </div>
                                </Col>
                                <Col sm={4} className="details">
                                    <h2 className="title-side">{data.name}</h2>
                                    <div className="rating">
                                        <div className="stars">
                                        </div>
                                    </div>
                                    <h3 className="price-product">Giá: {data.price} vnđ <span></span></h3>
                                    <h4 className="desc-product">Mô tả: {data.description} <span></span></h4>
                                    <div className="action">
                                        <button className="btn btn-default btn-custom" type="button"
                                                onClick={addToCart}>Add to cart
                                        </button>
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
                        <h2 className="title-side text-center comment-form">Bình luận</h2>
                        <div>
                            {
                                dataComment.map((cmt, index) => {
                                    return (
                                        <Row key={index}>
                                            <div className="comment-main-level">
                                                <div className="comment-avatar">
                                                    <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg"
                                                    alt=""/>
                                                </div>
                                                <div className="comment-box">
                                                    <div className="comment-head">
                                                        <h6 className="comment-name"><a
                                                            href="http://creaticode.com/blog">{cmt.nameComment}</a></h6>
                                                        <h6 className="comment-name">{cmt.email}</h6>
                                                    </div>
                                                    <div className="comment-content">
                                                        {cmt.comment}
                                                    </div>
                                                </div>
                                            </div>
                                        </Row>
                                    );
                                })
                            }
                        </div>
                        <div className="comment-form">
                            <h2 className="title-side text-center">Đánh giá</h2>
                            <Row className="input-form">
                                <Col sm={2}>
                                    <h3 htmlFor="fname">Họ tên: </h3>
                                </Col>
                                <Col sm={10}>
                                    <input type="text" id="name" name="name" placeholder="Họ tên"
                                           required="required"
                                           value={nameComment}
                                           onChange={e => setNameComment(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Row className="input-form">
                                <Col sm={2}>
                                    <h3 htmlFor="email">Email: </h3>
                                </Col>
                                <Col sm={10}>
                                    <input type="text" id="email" name="email" placeholder="Email"
                                           required="required"
                                           value={email}
                                           onChange={e => setEmail(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Row className="input-form">
                                <Col sm={2}>
                                    <h3 htmlFor="subject">Comment: </h3>
                                </Col>
                                <Col sm={10}>
                                    <textarea id="subject" name="subject" placeholder="Write something.."
                                              required="required"
                                              value={comment}
                                              onChange={e => setComment(e.target.value)}>
                                    </textarea>
                                </Col>
                            </Row>
                            <button type="submit" className="btn-custom btn-comment-form" onClick={addComment}>
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
