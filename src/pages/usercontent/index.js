import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
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
        window.location.replace('/edit/user/'+ idUser);
    };

    const dataUser = (user, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{user.name}</td>
                <td className="text-center">{user.username}</td>
                <td className="text-center"><Moment format="YYYY/MM/DD">{user.dateCreate}</Moment></td>
                <td className="text-center"><Moment format="YYYY/MM/DD">{user.dateUpdate}</Moment></td>
                <td className="text-center">
                    {<input type="checkbox" checked={user.isAdmin}/>}
                </td>
                <td className="text-center">
                    <button className="btn_3" style={{padding: '9px'}} onClick={() => editUser(user._id)}>Edit</button>
                    <button className="btn_3" style={{padding: '9px'}} onClick={() => removeUser(user._id)}>Delete</button>
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
                                    <h2>User List</h2>
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
                                    <th style={{width: '20%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Họ tên</th>
                                    <th style={{width: '20%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Username</th>
                                    <th style={{width: '15%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Ngày tạo</th>
                                    <th style={{width: '15%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Ngày cập nhật</th>
                                    <th style={{width: '10%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Phân quyền</th>
                                    <th style={{width: 'auto'}} className="text-center" scope="col">
                                        <input style={{width: 'auto'}} type="text" id="search" name="search" placeholder="Username người dùng"
                                               required="required"
                                               value={search}
                                               onChange={e => setSearch(e.target.value)}/>
                                        <button className="btn_3" style={{padding: '9px'}} type={"button"}
                                                onClick={() => searchUser(search)}>
                                            Search
                                        </button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentData.map(dataUser)}
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
                                <button className="btn"><a href="/add/user">Thêm người dùng</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default UserContent;
