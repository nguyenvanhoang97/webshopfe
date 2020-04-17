import React from "react";
import HomeContent from "./components/homecontent/homecontent";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BlogContent from "./components/blogcontent/blogcontent";
import ProductItem from "./components/productitem/productitem";
import Login from "./components/login/login";
import Register from "./components/register/register"

function App() {
    return(
        <div>
            <Router>
                <Route exact path="/" component={HomeContent} />
                <Route path="/blog" component={BlogContent} />
                <Route path="/product" component={ProductItem} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Router>
        </div>
    )
}

export default App;
