import React, {useEffect, useState} from "react";
import {Container, Col, Button, Table} from "reactstrap";
import Request from "../../utils/request";
import Moment from "react-moment";
import "moment-timezone"
import "./index.css"
import Paginator from "react-hooks-paginator";

function UserContent() {

    const [dataShow, setDataShow] = useState([]);
    const [dataFull, setDataFull] = useState([]);
    const [search, setSearch] = useState([]);
    const pageLimit = 10;

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    const getData = async () => {
        const {data} = await Request.get("user")
        setDataShow(data);
        setDataFull(data);
    };

    const searchUser = async (search) => {
        if (search && search.length) {
            const {data} = await Request.get("search/user/?q=" + search)
            setDataShow(data)
        } else {
            setDataShow(dataFull);
        }
    };

    useEffect( () => {
        getData();
        searchUser();
    }, []);

    useEffect(() => {
        setCurrentData(dataShow.slice(offset, offset + pageLimit));
    }, [offset, dataShow]);

    const removeUser = async (idUser) => {
        await Request.delete('user/' + idUser)
        window.location.reload();
    };

    const editUser = async (idUser) => {
        window.location.replace('http://localhost:3000/edit/user/'+ idUser);
    };

    const dataUser = (user, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{user.name}</td>
                <td className="text-center">{user.username}</td>
                <td className="text-center"><Moment>{user.dateCreate}</Moment></td>
                <td className="text-center"><Moment>{user.dateUpdate}</Moment></td>
                <td className="text-center">
                    {<input type="checkbox" checked={user.isAdmin}/>}
                </td>
                <td className="text-center">
                    <button className="btn-custom" onClick={() => editUser(user._id)}>Edit</button>
                    <button className="btn-custom" onClick={() => removeUser(user._id)}>Delete</button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid className="container-body">
            <Container fluid className="comment-form">
                <h2 className="title-side text-center">Danh mục người dùng</h2>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <th style={{width: '5%'}} className="text-center">STT</th>
                        <th style={{width: '20%'}} className="text-center">Tên người dùng</th>
                        <th style={{width: '20%'}} className="text-center">Tên đăng nhập</th>
                        <th style={{width: '15%'}} className="text-center">Ngày tạo</th>
                        <th style={{width: '15%'}} className="text-center">Ngày cập nhật</th>
                        <th style={{width: '10%'}} className="text-center">Is Admin</th>
                        <th style={{width: 'auto'}} className="table-search text-center">
                            <input type="text" id="search" name="search" placeholder="Tên nguoi dung"
                                   required="required"
                                   value={search}
                                   onChange={e => setSearch(e.target.value)}/>
                            <button className="btn-custom" type={"button"}
                                    onClick={() => searchUser(search)}>
                                Search
                            </button>
                        </th>
                        </thead>
                        <tbody>
                        {currentData.map(dataUser)}
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
                    <Button className="btn-custom btn-comment-form" href="/add/user">Thêm người dùng</Button>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    )
}

export default UserContent;
