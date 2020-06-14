import React, {useEffect, useState} from "react";
import {Container, Col, Table} from "reactstrap";
import Moment from 'react-moment';
import 'moment-timezone';
import "./index.css"
import {Button} from "react-bootstrap";
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
        window.location.replace('http://localhost:3000/edit/product/'+ idProduct);
    };

    const dataProducts = (product, index) => {
        return (
            <tr key={index}>
                <td className="text-center hidden">{product._id}</td>
                <td className="text-center">{index+1}</td>
                <td className="text-center">{product.name}</td>
                <td className="text-center"><img className="image-table" src={product.image.indexOf('http')===0?product.image:`http://localhost:4000/file/${product.image}`}/></td>
                <td className="text-center">{product.price} vnđ</td>
                <td className="text-center">{product.amount}</td>
                <td className="text-center"><Moment>{product.dateCreate}</Moment></td>
                <td className="text-center"><Moment>{product.dateUpdate}</Moment></td>
                <td className="text-center">
                    <button className="btn-custom" onClick={() => editProduct(product._id)}>Edit</button>
                    <button className="btn-custom" onClick={() => removeProduct(product._id)}>Delete</button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid className="container-body">
            <Container fluid className="comment-form">
                <h2 className="title-side text-center">Danh mục sản phẩm</h2>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <th style={{width: '5%'}} className="text-center">STT</th>
                        <th style={{width: '15%'}} className="text-center">Tên sản phẩm</th>
                        <th style={{width: '20%'}} className="text-center">Ảnh minh họa</th>
                        <th style={{width: '12%'}} className="text-center">Giá cả</th>
                        <th style={{width: '12%'}} className="text-center">Số lượng</th>
                        <th style={{width: '12%'}} className="text-center">Ngày tạo</th>
                        <th style={{width: '12%'}} className="text-center">Ngày cập nhật</th>
                        <th style={{width: '11%'}} className="table-search text-center">
                            <input style={{width: 'auto'}} type="text" id="search" name="search" placeholder="Tên sản phẩm"
                                   required="required"
                                   value={search}
                                   onChange={e => setSearch(e.target.value)}/>
                            <button className="btn-custom" type={"button"}
                                    onClick={() => searchProduct(search)}>
                                Search
                            </button>
                        </th>
                        </thead>
                        <tbody>
                        {currentData.map(dataProducts)}
                        <Paginator
                            totalRecords={dataShow.length}
                            pageLimit={pageLimit}
                            pageNeighbours={2}
                            setOffset={setOffset}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        </tbody>
                    </Table>
                    <Button href="/add/product" className="btn-custom btn-comment-form">Thêm Sản Phẩm</Button>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    )
}

export default HomeAdmin;
