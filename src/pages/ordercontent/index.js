import React, {useEffect, useState} from "react";
import {Container, Row, Col, Table} from "reactstrap";
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
            <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{order.name}</td>
                <td className="text-center">{order.address}</td>
                <td className="text-center">{order.phone}</td>
                <td className="text-center">{order.email}</td>
                <td className="text-center">
                    {
                        order.carts.map((product, index) => {
                            return(
                                <Row>
                                    <Row>{product.idProduct.name}</Row>
                                </Row>
                            )
                        })
                    }
                </td>
                <td className="text-center"><Moment>{order.dateCreate}</Moment></td>
                <td className="text-center"><Moment>{order.dateUpdate}</Moment></td>
                <td className="text-center">{order.note}</td>
                <td className="text-center">{<input type="checkbox" checked={order.status}/>}</td>
                <td className="text-center">
                    {
                        order.carts.map((product, index) => {
                            return(
                                <Row>
                                    <Row>{product.idProduct.price * product.amount}</Row>
                                </Row>
                            )
                        })
                    }
                </td>
                <td className="text-center">
                    <button className="btn-custom" onClick={() => editStatus(order._id)} >Edit status</button>
                    <button className="btn-custom" onClick={() => removeOrder(order._id)}>Delete</button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid className="container-body">
            <Container fluid className="comment-form">
                <h2 className="title-side text-center">Danh mục đơn hàng</h2>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <th style={{width: '3%'}} className="text-center">STT</th>
                        <th style={{width: '8%'}} className="text-center">Tên người nhận</th>
                        <th style={{width: '8%'}} className="text-center">Địa chỉ</th>
                        <th style={{width: '8%'}} className="text-center">Số điện thoại</th>
                        <th style={{width: '10%'}} className="text-center">Email</th>
                        <th style={{width: '12%'}} className="text-center">Ten san pham</th>
                        <th style={{width: '8%'}} className="text-center">Ngày tạo</th>
                        <th style={{width: '8%'}} className="text-center">Ngày cập nhật</th>
                        <th style={{width: '12%'}} className="text-center">Chú thích</th>
                        <th style={{width: '6%'}} className="text-center">Trạng thái</th>
                        <th style={{width: '6%'}} className="text-center">Tổng tiền</th>
                        <th style={{width: 'auto'}} className="table-search text-center">
                            <input type="text" id="search" name="search" placeholder="Mã đơn hàng"
                                   required="required"
                                   value={search}
                                   onChange={e => setSearch(e.target.value)}/>
                            <button className="btn-custom" type={"button"}
                                    onClick={() => searchOrder(search)}>
                                Search
                            </button>
                        </th>
                        </thead>
                        <tbody>
                        {currentData.map(dataOrder)}
                        </tbody>
                    </Table>
                    <Row>
                        <Paginator
                            totalRecords={dataShow.length}
                            pageLimit={pageLimit}
                            pageNeighbours={2}
                            setOffset={setOffset}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Row>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    )
}

export default OrderContent;
