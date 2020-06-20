import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import Request from "../../utils/request";
import "./index.css"

function MainContent() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await Request.getNoToken("product")
        const dataShow= data.slice(0,3)
        setData(dataShow);
    };

    const addToCart = async (idProduct) => {
        await Request.put('cart', {idProduct, amount: 1})
            .then( function (response) {
                alert("Đã thêm vào trong giỏ hàng")
            }).catch(err => {
                alert("Đã có trong giỏ hàng hoặc chưa đăng nhập")
            })
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container fluid>

            <div className="slider-area ">
                <div className="slider-active">
                    <div className="single-slider slider-height d-flex align-items-center slide-bg">
                        <div className="container">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
                                    <div className="hero__caption">
                                        <h1 data-animation="fadeInLeft" data-delay=".4s"
                                            data-duration="2000ms">Select Your New Perfect Style</h1>
                                        <p data-animation="fadeInLeft" data-delay=".7s" data-duration="2000ms">Ut
                                            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat is aute irure.</p>

                                        <div className="hero__btn" data-animation="fadeInLeft" data-delay=".8s"
                                             data-duration="2000ms">
                                            <a href="/shop" className="btn hero-btn">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 d-none d-sm-block">
                                    <div className="hero__img" data-animation="bounceIn" data-delay=".4s">
                                        <img src="assets/img/hero/watch.png" alt="" className=" heartbeat"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="new-product-area section-padding30">
                <div className="container">

                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-tittle mb-70">
                                <h2>New Arrivals</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            data.map((product, index) => {
                                return(
                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                        <div className="single-new-pro mb-30 text-center">
                                            <div className="product-img">
                                                <img className="img-main" src={product.image.indexOf('http')===0?product.image:`http://localhost:4000/file/${product.image}`}/>
                                            </div>
                                            <div className="product-caption">
                                                <h3><a href={"product/" + product._id} >{product.name}</a></h3>
                                                <span>{product.price} vnd</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>

            <div className="gallery-area">
                <div className="container-fluid p-0 fix">
                    <div className="row">
                        <div className="col-xl-6 col-lg-4 col-md-6 col-sm-6">
                            <div className="single-gallery mb-30">
                                <div className="gallery-img big-img"
                                     style={{backgroundImage: `url(${'assets/img/gallery/gallery1.png'})`}}>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="single-gallery mb-30">
                                <div className="gallery-img big-img"
                                     style={{backgroundImage: `url(${'assets/img/gallery/gallery2.png'})`}}>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-12">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-6 col-sm-6">
                                    <div className="single-gallery mb-30">
                                        <div className="gallery-img small-img"
                                             style={{backgroundImage: `url(${'assets/img/gallery/gallery3.png'})`}}>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12  col-md-6 col-sm-6">
                                    <div className="single-gallery mb-30">
                                        <div className="gallery-img small-img"
                                            style={{backgroundImage: `url(${'assets/img/gallery/gallery4.png'})`}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="popular-items section-padding30">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-10">
                            <div className="section-tittle mb-70 text-center">
                                <h2>Popular Items</h2>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            data.map((product, index) => {
                                return(
                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                        <div className="single-popular-items mb-50 text-center">
                                            <div className="popular-img">
                                                <img className="img-main" src={product.image.indexOf('http')===0?product.image:`http://localhost:4000/file/${product.image}`}/>
                                                <div className="img-cap">
                                                    <span onClick={() => addToCart(product._id)}>Add to cart</span>
                                                </div>
                                                <div className="favorit-items">
                                                    <span className="flaticon-heart"></span>
                                                </div>
                                            </div>
                                            <div className="popular-caption">
                                                <h3><a href={"product/" + product._id}>{product.name}</a></h3>
                                                <span>{product.price} vnd</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="row justify-content-center">
                        <div className="room-btn pt-70">
                            <a href="/shop" className="btn view-btn1">View More Products</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="video-area">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="video-wrap">
                                <div className="play-btn "><a className="popup-video"
                                                              href="#"><i
                                    className="fas fa-play"></i></a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="watch-area section-padding30">
                <div className="container">
                    <div className="row align-items-center justify-content-between padding-130">
                        <div className="col-lg-5 col-md-6">
                            <div className="watch-details mb-40">
                                <h2>Watch of Choice</h2>
                                <p>Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                    esse.</p>
                                <a href="/shop" className="btn">Show Watches</a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-10">
                            <div className="choice-watch-img mb-40">
                                <img src="assets/img/gallery/choce_watch1.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-6 col-md-6 col-sm-10">
                            <div className="choice-watch-img mb-40">
                                <img src="assets/img/gallery/choce_watch2.png" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6">
                            <div className="watch-details mb-40">
                                <h2>Watch of Choice</h2>
                                <p>Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                    esse.</p>
                                <a href="/shop" className="btn">Show Watches</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shop-method-area">
                <div className="container">
                    <div className="method-wrapper">
                        <div className="row d-flex justify-content-between">
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-method mb-40">
                                    <i className="ti-package"></i>
                                    <h6>Free Shipping Method</h6>
                                    <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-method mb-40">
                                    <i className="ti-unlock"></i>
                                    <h6>Secure Payment System</h6>
                                    <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-method mb-40">
                                    <i className="ti-reload"></i>
                                    <h6>Secure Payment System</h6>
                                    <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default MainContent;
