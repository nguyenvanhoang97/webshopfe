import React, {useEffect, useState} from "react";
import "./index.css"
import {Container} from "reactstrap";
import Request from "../../utils/request";

function ProductItem(props) {
    const [data, setData] = useState([]);
    const [dataComment, setDataComment] = useState([]);
    const [nameComment, setNameComment] = useState();
    const [email, setEmail] = useState();
    const [comment, setComment] = useState();
    const idProduct = props.match.params.id;

    const getProductId = async () => {
        const {data} = await Request.getNoToken('product/' + idProduct)
        const dataComment = data.comments
        setDataComment(dataComment)
        console.log(data)
        setData(data);
    };

    const addComment = async (e) => {
        e.preventDefault()
        await Request.putNoToken('comment/' + idProduct, {nameComment, email, comment})
        window.location.reload();
    }

    const addToCart = async () => {
        await Request.put('cart', {idProduct, amount: 1})
            .then( function (response) {
                alert("Đã thêm vào giỏ hàng")
            }).catch(err => {
                alert("Đã có trong giỏ hàng hoặc chưa đăng nhập")
            })
    };

    useEffect(() => {
        getProductId();
    }, []);

    return (
        <Container fluid>
            <div className="slider-area ">
                <div className="single-slider slider-height2" style={{display: 'flex', alignItems: 'center'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Product details</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product_image_area">
                <div className="container">
                    <div className="row justify-content-center" style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <div className="col-lg-12">
                            <div className="product_img_slide owl-carousel" style={{textAlign: 'center'}}>
                                <img alt={data.name} key={data._id}
                                     className="img-product"
                                     src={data.image === 0 ? data.image : `http://localhost:4000/file/${data.image}`}/>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="single_product_text text-center" >
                                <h1 style={{textAlign: 'center'}}>{data.name}</h1>
                                <h4 style={{textAlign: 'center'}}>
                                    {data.description}
                                </h4>
                                <h3 style={{textAlign: 'center'}}>{data.price} VND</h3>

                                <div style={{textAlign: 'center'}} className="card_area">
                                    <div className="add_to_cart">
                                        <button onClick={addToCart} className="btn_3">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comments-area">
                            <h4>Comments review</h4>
                            <div className="comment-list">
                                <div className="single-comment justify-content-between d-flex">
                                    {
                                        dataComment.map((cmt, index) => {
                                            return(
                                                <div className="user" style={{display: 'flex', justifyContent: 'between', marginTop: '30px'}}>
                                                    <div style={{display: 'flex'}}>
                                                        <div className="thumb" style={{textAlign: 'center'}}>
                                                            <img src="/assets/img/comment/comment_1.png"/>
                                                        </div>
                                                        <div className="justify-content-between" style={{justifyContent: 'between'}}>
                                                            <div className="d-flex align-items-center" style={{alignItems: 'center'}}>
                                                                <span style={{marginLeft: '30px'}}>{cmt.nameComment}</span>
                                                                <span style={{marginLeft: '30px'}}>{cmt.email} </span>
                                                            </div>
                                                            <div className="desc" style={{marginLeft: '30px'}}>
                                                                <p className="comment">
                                                                    {cmt.comment}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="comment-form">
                            <h4>Comments</h4>
                            <form className="form-contact comment_form" action="#" id="commentForm">
                                <div className="row">
                                    <div className="row" style={{display: 'flex'}}>
                                        <div style={{width: '50%'}}>
                                            <div className="form-group">
                                                <input type="text" id="name" name="name" placeholder="Họ tên"
                                                       className="form-control"
                                                       required={true}
                                                       value={nameComment}
                                                       onChange={e => setNameComment(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div style={{width: '50%'}}>
                                            <div className="form-group">
                                                <input type="text" id="email" name="email" placeholder="Email"
                                                       cols="30" rows="9"
                                                       className="form-control"
                                                       required={true}
                                                       value={email}
                                                       onChange={e => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea id="subject" name="subject" placeholder="Write something.."
                                                className="form-control"
                                                required={true}
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="button button-contactForm btn_1 boxed-btn" onClick={addComment}>
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProductItem;
