import React, {useEffect, useState} from "react";
import {Container, Col} from "reactstrap";
import FormData from "form-data";
import Request from "../../utils/request";

function AddProduct(props) {
    const isAdd = props.match.path === '/add/product'
    const idProduct = props.match.params.id;

    const [data, setData] = useState([])
    const [name, setName] = useState();
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [price, setPrice] = useState();
    const [amount, setAmount] = useState();
    const [description, setDesc] = useState();

    const addProduct = async (e) => {
        e.preventDefault()
        const data=new FormData()
        data.append('image',image.raw)
        data.append('name',name)
        data.append('price',price)
        data.append('amount',amount)
        data.append('description',description)
        await Request.post('product', data)
        window.location.replace('http://localhost:3000/home')
    }

    const updateProduct = async (e) => {
        e.preventDefault()
        const data=new FormData()
        data.append('image',image.raw)
        data.append('name',name)
        data.append('price',price)
        data.append('amount',amount)
        data.append('description',description)
        await Request.put('product/' + idProduct, data)
            .then(function (response) {
                window.location.replace('http://localhost:3000/home')
            }).catch(err => {
                alert("Cập nhật không thành công")
            })
    }

    const getProductId = async () => {
        const {data} = await Request.get('product/' + idProduct)
        setName(data.name)
        setImage({
            raw: data.image,
            preview: data.image.indexOf('http')===0?data.image:`http://localhost:4000/file/${data.image}`
        })
        setPrice(data.price)
        setAmount(data.amount)
        setDesc(data.description)
        setData(data)
    };

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    useEffect( () => {
        getProductId();
    }, []);

    return (
        <Container fluid className="container-body">
            <Container fluid className="comment-form">
                <Col sm={2}></Col>
                <Col sm={8}>
                    {isAdd && <h2 className="title-side text-center">Thêm thông tin sản phẩm</h2>}
                    {!isAdd && <h2 className="title-side text-center">Sửa thông tin sản phẩm</h2>}
                    <div>
                        <label htmlFor="fname">Tên sản phẩm</label>
                        <input type="text" id="name" name="name" placeholder="Tên sản phẩm"
                               required={true}
                               value={name}
                               onChange={e => setName(e.target.value)}/>

                        <label htmlFor="fname">Hình ảnh sản phẩm</label>
                        <div>
                            <label htmlFor="upload-button">
                                {image.preview ? (
                                    <img src={image.preview} alt="Hình ảnh sản phẩm" width="300" height="300" />
                                ) : (
                                    <>
                                        <h5 className="text-center">Upload your photo</h5>
                                    </>
                                )}
                            </label>
                            <input
                                type="file"
                                id="upload-button"
                                required={true}
                                style={{ display: "none" }}
                                onChange={handleChange}
                            />
                        </div>

                        <label htmlFor="lname">Giá sản phẩm</label>
                        <input type="text" id="price" name="price" placeholder="Giá sản phẩm"
                               required={true}
                               value={price}
                               onChange={e => setPrice(e.target.value)}/>

                        <label htmlFor="lname">Số lượng sản phẩm</label>
                        <input type="text" id="amount" name="amount" placeholder="Số lượng sản phẩm"
                               required={true}
                               value={amount}
                               onChange={e => setAmount(e.target.value)}/>

                        <label htmlFor="subject">Mô tả chi tiết sản phẩm</label>
                        <textarea style={{height: '400px'}} id="description" name="description" placeholder="Mô tả chi tiết"
                                  required={true}
                                  value={description}
                                  onChange={e => setDesc(e.target.value)}>
                        </textarea>

                        {isAdd && <button type="submit" className="btn-custom btn-comment-form" onClick={addProduct}>
                            Thêm sản phẩm
                        </button>}
                        {!isAdd && <button type="submit" className="btn-custom btn-comment-form" onClick={updateProduct}>
                            Sửa sản phẩm
                        </button>}
                    </div>
                </Col>
                <Col sm={2}></Col>
            </Container>
        </Container>
    )
}

export default AddProduct;
