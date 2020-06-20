import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import Request from "../../utils/request";
import Moment from 'react-moment';
import 'moment-timezone';
import Paginator from "react-hooks-paginator";

function OrderContent() {
    const [dataShow, setDataShow] = useState([]);
    const [dataFull, setDataFull] = useState([]);
    const [search, setSearch] = useState([]);
    const pageLimit = 10;

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    const getData = async () => {
        const {data} = await Request.get('order')
        setDataShow(data);
        setDataFull(data);
    };

    const searchOrder = async (search) => {
        if (search && search.length) {
            const {data} = await Request.get("search/order/?q=" + search)
            setDataShow(data)
        } else {
            setDataShow(dataFull);
        }
    };

    useEffect( () => {
        getData();
        searchOrder();
    }, []);

    useEffect(() => {
        setCurrentData(dataShow.slice(offset, offset + pageLimit));
    }, [offset, dataShow]);

    const removeOrder = async (id) => {
        await Request.delete('order/'+ id)
        window.location.reload();
    };

    const editStatus = async (id) => {
        await Request.put('order/'+ id)
        window.location.reload();
    };

    const dataOrder = (order, index) => {
        return (
            <tr style={{fontSize: '12px'}} key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{order.name}</td>
                <td className="text-center">{order.address}</td>
                <td className="text-center">{order.phone}</td>
                <td className="text-center">{order.email}</td>
                <td className="text-center">
                    {
                        order.carts.map((product, index) => {
                            return(
                                <div>
                                    <span>{product.idProduct.name}</span>
                                </div>
                            )
                        })
                    }
                </td>
                <td className="text-center"><Moment format="YYYY/MM/DD">{order.dateCreate}</Moment></td>
                <td className="text-center"><Moment format="YYYY/MM/DD">{order.dateUpdate}</Moment></td>
                <td className="text-center">{order.note}</td>
                <td className="text-center">{<input type="checkbox" checked={order.status}/>}</td>
                <td className="text-center">
                    {
                        order.carts.map((product, index) => {
                            return(
                                <div>
                                    <span>{product.idProduct.price * product.amount}</span>
                                </div>
                            )
                        })
                    }
                </td>
                <td className="text-center">
                    <button className="btn_3" style={{padding: '9px'}} onClick={() => editStatus(order._id)} >Edit status</button>
                    <button className="btn_3" style={{padding: '9px'}} onClick={() => removeOrder(order._id)}>Delete</button>
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
                                    <h2>Order List</h2>
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
                                    <th style={{width: '3%',fontSize: '12px', verticalAlign: 'middle'}} className="text-center">STT</th>
                                    <th style={{width: '8%', fontSize: '12px', verticalAlign: 'middle'}} className="text-center">Tên người nhận</th>
                                    <th style={{width: '8%', fontSize: '12px', verticalAlign: 'middle'}} className="text-center">Địa chỉ</th>
                                    <th style={{width: '8%', fontSize: '12px', verticalAlign: 'middle'}} className="text-center">Số điện thoại</th>
                                    <th style={{width: '8%', fontSize: '12px', verticalAlign: 'middle'}} className="text-center">Email</th>
                                    <th style={{width: '12%', fontSize: '12px', verticalAlign: 'middle'}} className="text-center">Tên sản phẩm</th>
                                    <th style={{width: '8%', fontSize: '12px', verticalAlign: 'middle'}} className="text-center">Ngày tạo</th>
                                    <th style={{width: '8%', fontSize: '12px', verticalAlign: 'middle'}} className="text-center">Ngày cập nhật</th>
                                    <th style={{width: '12%', fontSize: '12px', verticalAlign: 'middle'}} className="text-center">Chú thích</th>
                                    <th style={{width: '6%', fontSize: '12px', verticalAlign: 'middle'}} className="text-center">Trạng thái</th>
                                    <th style={{width: '6%', fontSize: '12px', verticalAlign: 'middle'}} className="text-center">Tổng tiền</th>
                                    <th style={{width: 'auto'}} className="text-center" scope="col">
                                            <input className="col-sm-7" style={{width: 'auto'}} type="text" id="search" name="search" placeholder=""
                                                   required="required"
                                                   value={search}
                                                   onChange={e => setSearch(e.target.value)}/>
                                            <button className="btn_3 col-sm-5" style={{padding: '9px'}} type={"button"}
                                                    onClick={() => searchOrder(search)}>
                                                Search
                                            </button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentData.map(dataOrder)}
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
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default OrderContent;
