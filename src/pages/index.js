import React, {} from "react";
import {Container} from "reactstrap";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./../components/header/header";
import Footer from "./../components/footer/footer";
import HomeContent from "./homecontent/homecontent";
import BlogContent from "./blogcontent/blogcontent";
import ProductItem from "./productitem/productitem";
import Login from "./login/login";
import ContentCart from "./cart/cart";
import HomeAdmin from "./homeadmin/homeadmin";
import AddProduct from "./addproduct/addproduct";
import AddUser from "./addUser/addUser";
import UserContent from "./usercontent/usercontent";
import NewsItem from "./newsitem/newsitem";
import CheckOut from "./checkout/checkout";

function Main() {

    return(
        <div>
            <Header/>
            <Container fluid className="">
                <Router>
                    <Route exact path="/" component={HomeContent} />
                    <Route path="/blog" component={BlogContent} />
                    <Route path='/product/:id' component={ProductItem}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" component={Login}/>
                    <Route path="/cart" component={ContentCart} />
                    <Route path="/home" component={HomeAdmin} />
                    <Route path="/add/product" component={AddProduct} />
                    <Route path="/add/user" component={AddUser} />
                    <Route path="/edit/user/:id" component={AddUser} />
                    <Route path="/user" component={UserContent} />
                    <Route path='/blog/:id' component={NewsItem}/>
                    <Route path="/order" component={CheckOut} />
                </Router>
            </Container>
            <Footer/>
        </div>
    )
}

export default Main;
