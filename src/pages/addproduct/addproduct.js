import React, {useState} from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import {Container, Col} from "reactstrap";
import * as axios from "axios";

function AddProduct() {

    return(
        <Container fluid>
            <Container fluid>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <h2 className="title-side text-center">Thêm sản phẩm</h2>
                    <div >
                        <label htmlFor="fname">Tên sản phẩm</label>
                        <input type="text" id="name" name="name" placeholder="Tên sản phẩm"/>

                        <label htmlFor="fname">Hình ảnh sản phẩm</label>
                        <input type="file" name="fileToUpload" id="fileToUpload"/>

                        <label htmlFor="lname">Giá sản phẩm</label>
                        <input type="text" id="price" name="price" placeholder="Giá sản phẩm"/>

                        <label htmlFor="lname">Số lượng sản phẩm</label>
                        <input type="text" id="amount" name="amount" placeholder="Số lượng sản phẩm"/>

                        <label htmlFor="subject">Mô tả chi tiết sản phẩm</label>
                        <textarea id="description" name="description" placeholder="Mô tả chi tiết"></textarea>
                        <button type="submit" className="">
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
