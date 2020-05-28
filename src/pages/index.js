import React, {} from "react";
import {Container} from "reactstrap";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./../components/header/header";
import HomeContent from "./homecontent/index";
import BlogContent from "./blogcontent/index";
import ProductItem from "./productitem/index";
import Login from "./login/index";
import ContentCart from "./cart/cart";
import HomeAdmin from "./homeadmin/index";
import AddProduct from "./addproduct/index";
import AddUser from "./addUser/index";
import UserContent from "./usercontent/index";
import CheckOut from "./checkout/checkout";
import AddNews from "./addnews/index";
import NewsContent from "./newscontent/index";
import BlogItem from "./blogitem";
import OrderContent from "./ordercontent";

function Main() {

    return(
        <div>
            <Header/>
            <Container fluid className="">
                <Router>
                    <Route exact path="/" component={HomeContent} />
                    <Route path="/blogs" component={BlogContent} />
                    <Route path='/product/:id' component={ProductItem}/>
                    <Route path='/blog/:id' component={BlogItem}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" component={Login}/>
                    <Route path="/cart" component={ContentCart} />
                    <Route path="/home" component={HomeAdmin} />
                    <Route path="/add/product" component={AddProduct} />
                    <Route path="/add/user" component={AddUser} />
                    <Route path="/add/news" component={AddNews} />
                    <Route path="/news" component={NewsContent} />
                    <Route path="/edit/user/:id" component={AddUser} />
                    <Route path="/edit/product/:id" component={AddProduct} />
                    <Route path="/edit/news/:id" component={AddNews} />
                    <Route path="/user" component={UserContent} />
                    <Route path="/checkout" component={CheckOut} />
                    <Route path="/order" component={OrderContent} />
                </Router>
            </Container>
        </div>
    )
}

export default Main;
