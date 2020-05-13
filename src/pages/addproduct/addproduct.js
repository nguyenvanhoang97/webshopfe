import React, {useState} from "react";
import {Container, Col} from "reactstrap";
import * as axios from "axios";

function AddProduct() {

    const [name, setName] = useState();
    const [image, setImage] = useState();
    const [price, setPrice] = useState();
    const [amount, setAmount] = useState();
    const [description, setDesc] = useState();

    const addProduct = e => {
        e.preventDefault()

        axios.post("http://localhost:4000/product",
            {
                name, image, price, amount, description
            }
        )
            .then(function (response) {
                console.log(response);
                if (response) {

                } else {

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        <Container fluid>
            <Container fluid>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <h2 className="title-side text-center">Thêm sản phẩm</h2>
                    <div>
                        <label htmlFor="fname">Tên sản phẩm</label>
                        <input type="text" id="name" name="name" placeholder="Tên sản phẩm"
                               required="required"
                               value={name}
                               onChange={e => setName(e.target.value)}/>

                        <label htmlFor="fname">Hình ảnh sản phẩm</label>
                        <input type="file" name="image" id="image" onChange={e => setImage(e.target.files)}/>

                        <label htmlFor="lname">Giá sản phẩm</label>
                        <input type="text" id="price" name="price" placeholder="Giá sản phẩm"
                               required="required"
                               value={price}
                               onChange={e => setPrice(e.target.value)}/>

                        <label htmlFor="lname">Số lượng sản phẩm</label>
                        <input type="text" id="amount" name="amount" placeholder="Số lượng sản phẩm"
                               required="required"
                               value={amount}
                               onChange={e => setAmount(e.target.value)}/>

                        <label htmlFor="subject">Mô tả chi tiết sản phẩm</label>
                        <textarea id="description" name="description" placeholder="Mô tả chi tiết"
                                  required="required"
                                  value={description}
                                  onChange={e => setDesc(e.target.value)}>
                        </textarea>

                        <button type="submit" className="" onClick={addProduct}>
                            Thêm sản phẩm
                        </button>
                    </div>
                </Col>
                <Col sm={2}></Col>
            </Container>
        </Container>
    )
}

export default AddProduct;
