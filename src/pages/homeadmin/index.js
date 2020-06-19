import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import Moment from 'react-moment';
import 'moment-timezone';
import Request from "../../utils/request";
import Paginator from "react-hooks-paginator";

function HomeAdmin() {
    const [dataShow, setDataShow] = useState([]);
    const [dataFull, setDataFull] = useState([]);
    const [search, setSearch] = useState([]);
    const pageLimit = 10;

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    const getData = async () => {
        const {data} = await Request.get('product')
        setDataShow(data);
        setDataFull(data);
    };

    const searchProduct = async (search) => {
        if (search && search.length) {
            const {data} = await Request.get("search/product/?q=" + search)
            console.log(data)
            setDataShow(data)
        } else {
            setDataShow(dataFull);
        }
    };

    useEffect( () => {
        getData();
        searchProduct();
    }, []);

    useEffect(() => {
        setCurrentData(dataShow.slice(offset, offset + pageLimit));
    }, [offset, dataShow]);

    const removeProduct = async (idProduct) => {
        await Request.delete('product/'+ idProduct)
        window.location.reload();
    };

    const editProduct = async (idProduct) => {
        window.location.replace('/product/'+ idProduct);
    };

    const dataProducts = (product, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{index+1}</td>
                <td className="text-center">{product.name}</td>
                <td className="text-center"><img style={{width: '150px', height: '150px'}} src={product.image.indexOf('http')===0?product.image:`http://localhost:4000/file/${product.image}`}/></td>
                <td className="text-center">{product.price} vnđ</td>
                <td className="text-center">{product.amount}</td>
                <td className="text-center"><Moment>{product.dateCreate}</Moment></td>
                <td className="text-center"><Moment>{product.dateUpdate}</Moment></td>
                <td className="text-center">
                    <button className="btn_3" style={{padding: '9px'}} onClick={() => editProduct(product._id)}>Edit</button>
                    <button className="btn_3" style={{padding: '9px'}} onClick={() => removeProduct(product._id)}>Delete</button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid>
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Product List</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="cart_area section_padding">
                <div className="container_table">
                    <div className="cart_inner">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th style={{width: '5%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">STT</th>
                                    <th style={{width: '20%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Tên sản phẩm</th>
                                    <th style={{width: '20%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Hình ảnh </th>
                                    <th style={{width: '10%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Giá cả</th>
                                    <th style={{width: '10%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Số lượng</th>
                                    <th style={{width: '10%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Ngày tạo</th>
                                    <th style={{width: '10%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Ngày cập nhật</th>
                                    <th style={{width: 'auto'}} className="text-center" scope="col">
                                        <input style={{width: 'auto'}} type="text" id="search" name="search" placeholder="Tên sản phẩm"
                                               required="required"
                                               value={search}
                                               onChange={e => setSearch(e.target.value)}/>
                                        <button className="btn_3" style={{padding: '9px'}} type={"button"}
                                                onClick={() => searchProduct(search)}>
                                            Search
                                        </button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentData.map(dataProducts)}
                                </tbody>
                            </table>
                            <Paginator
                                totalRecords={dataShow.length}
                                pageLimit={pageLimit}
                                pageNeighbours={2}
                                setOffset={setOffset}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                            <div className="checkout_btn_inner float-right">
                                <button href="/add/product" className="btn">Thêm Sản Phẩm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default HomeAdmin;
