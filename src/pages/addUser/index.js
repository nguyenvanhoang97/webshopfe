import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import Request from "../../utils/request";

function AddUser(props) {
    const isAdd = props.match.path === '/add/user'
    const idUser = props.match.params.id;

    const [data, setData] = useState([])
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [isAdmin, setAdmin] = useState(false);

    const addUser = async (e) => {
        e.preventDefault()
        await Request.post('user', {name, username, isAdmin, password})
            .then(function (response) {
                window.location.replace('/user')
            }).catch(err => {
                alert("Thêm người dùng không thành công")
            })
    }

    const getUserById = async () => {
        const {data} = await Request.get('user/' + idUser);
        setName(data.name)
        setUsername(data.username)
        setAdmin(data.isAdmin)
        setPass(data.password)
        setData(data)
    };

    const updateUser = async (e) => {
        e.preventDefault()
        await Request.put('user/' + idUser,{name, username, password, isAdmin})
            .then(function (response) {
                window.location.replace('/user')
            }).catch(err => {
                alert("Cập nhật không thành công")
            })
    }

    useEffect( () => {
        getUserById();
    }, []);

    return (
        <Container fluid>
            <div className="slider-area ">
                <div className="single-slider slider-height2" style={{display: 'flex', alignItems: 'center'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    {isAdd && <h2>Add user</h2>}
                                    {!isAdd && <h2>Edit user</h2>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="blog_area section-padding" style={{maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto'}}>
                <div style={{display: 'inline'}}>
                    <h3 htmlFor="fname">First and last name</h3>
                    <input type="text" id="name" name="name" placeholder="First and last name"
                           className="form-control"
                           required={true}
                           value={name}
                           onChange={e => setName(e.target.value)}
                    />

                    <h3 htmlFor="lname">Username</h3>
                    <input type="text" id="uname" name="username" placeholder="Username"
                           className="form-control"
                           required={true}
                           value={username}
                           onChange={e => setUsername(e.target.value)}
                    />

                    {isAdd && <h3 htmlFor="lname">Password ( tối thiểu 6 kí tự )</h3>}
                    {isAdd && <input type="password" id="pass" name="password" placeholder="Password"
                                     style={{width: '97.5%'}}
                           className="form-control"
                           required={true}
                           value={password}
                           onChange={e => setPass(e.target.value)}
                    />}

                    <h3 htmlFor="">Check admin</h3>
                    <label className="checkbox">
                        <input type="checkbox" id="isadmin" name="isAdmin" checked={isAdmin}
                               onChange={e => setAdmin(JSON.parse(e.target.checked))}/> Check admin
                    </label>
                </div>
                <div className="blog_area section-padding">
                    {isAdd && <button type="button" className="btn" onClick={addUser}>
                        Thêm người dùng
                    </button>}
                    {!isAdd && <button type="button" className="btn" onClick={updateUser}>
                        Sửa thông tin người dùng
                    </button>}
                </div>
            </section>
        </Container>
    )
}

export default AddUser;
