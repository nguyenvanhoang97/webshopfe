import React, {} from "react";
import {Container} from "reactstrap";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./../components/header/header";
import Footer from "./../components/footer/footer";
import HomeContent from "./homecontent/index";
import BlogContent from "./blogcontent/index";
import ProductItem from "./productitem/index";
import Login from "./login/index";
import ContentCart from "./cart/cart";
import HomeAdmin from "./homeadmin/index";
import AddProduct from "./addproduct/index";
import AddUser from "./addUser/addUser";
import UserContent from "./usercontent/index";
import NewsItem from "./newsitem/index";
import CheckOut from "./checkout/checkout";
import AddNews from "./addnews/index";
import NewsContent from "./newscontent/index";

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
                    <Route path="/add/news" component={AddNews} />
                    <Route path="/news" component={NewsContent} />
                    <Route path="/edit/user/:id" component={AddUser} />
                    <Route path="/edit/product/:id" component={AddProduct} />
                    <Route path="/edit/news/:id" component={AddNews} />
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
