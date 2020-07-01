import React, {useEffect, useState} from "react";
import {Container, Col} from "reactstrap"
import Request from "../../utils/request";
import Paginator from "react-hooks-paginator";

function HomeContent() {
    const [dataShow, setDataShow] = useState([]);
    const [dataFull, setDataFull] = useState([]);
    const [search, setSearch] = useState([]);
    const pageLimit = 12;

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    const getData = async () => {
        const {data} = await Request.getNoToken("product")
        setDataShow(data);
        setDataFull(data);
    };

    const searchProduct = async (search) => {
        if (search && search.length) {
            const {data} = await Request.getNoToken("search/product/?q=" + search)
            console.log(data)
            setDataShow(data)
        } else {
            setDataShow(dataFull);
        }
    };

    useEffect(() => {
        setCurrentData(dataShow.slice(offset, offset + pageLimit));
    }, [offset, dataShow]);

    const addToCart = async (idProduct) => {
        await Request.put('cart', {idProduct, amount: 1})
            .then( function (response) {
                alert("Đã thêm vào giỏ hàng")
            }).catch(err => {
            alert("Đã có trong giỏ hàng hoặc chưa đăng nhập")
        })
    };

    useEffect(() => {
        getData();
        searchProduct();
    }, []);

    return (
        <Container fluid>
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Watch Shop</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="popular-items latest-padding">
                <div className="container">
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                             aria-labelledby="nav-home-tab">
                            <div className="row">
                                <div className="col-sm-8">

                                </div>
                                <div className="col-sm-4" style={{display: 'flex'}}>
                                    <div className="form-group col-sm-8">
                                        <div className="input-group mb-3">
                                            <input type="text" id="search" name="search" placeholder="Enter name product"
                                                   style={{marginTop: '0px'}}
                                                   className="form-control"
                                                   required="required"
                                                   value={search}
                                                   onChange={e => setSearch(e.target.value)}/>
                                        </div>
                                    </div>
                                    <button className="col-sm-4 btn" style={{height: '48px', padding: '0px'}}
                                            type="submit" onClick={() => searchProduct(search)} >Search
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    currentData.map((product, index) => {
                                        return(
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                <div className="single-popular-items mb-50 text-center">
                                                    <div className="popular-img">
                                                        <img className="img-main" src={product.image.indexOf('http')===0?product.image:`http://localhost:4000/file/${product.image}`}/>
                                                            <div className="img-cap">
                                                                <span onClick={() => addToCart(product._id)}>Add to cart</span>
                                                            </div>
                                                    </div>
                                                    <div className="popular-caption">
                                                        <h3><a href={"/product/" + product._id}>{product.name}</a>
                                                        </h3>
                                                        <span>{product.price} vnd</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Col sm={9} className="">
                    <Paginator
                        totalRecords={dataShow.length}
                        pageLimit={pageLimit}
                        pageNeighbours={2}
                        setOffset={setOffset}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </Col>
            </section>
        </Container>
    )
}

export default HomeContent;
