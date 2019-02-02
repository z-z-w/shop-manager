import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {createBrowserHistory} from 'history'

import Home from 'views/home/index.jsx'
import Login from 'views/login/index.jsx'
import User from 'views/user/index.jsx'
import Order from 'views/order/index.jsx'
import OrderDetail from 'views/order/detail.jsx'
import Category from 'views/category/index.jsx'
import CategorySave from 'views/category/save.jsx'
import Product from 'views/product/index.jsx'
import ProductSave from 'views/product/save.jsx'
import ProductDetail from 'views/product/detail.jsx'
import Service from "./service";

const history = createBrowserHistory()

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    async componentWillMount() {
        let res = await Service.isAdmin()
        if(res.status === 200 && res.data.status === 1) {
            if(location.pathname !== '/login') {
                location.href = '/login'
            }
        }
    }

    render(){
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Home>
                            <Route exact path="/product" component={Product} />
                            <Route path="/product/save/:id?" component={ProductSave} />
                            <Route path="/product/detail/:id" component={ProductDetail} />
                            <Route exact path="/category" component={Category} />
                            <Route exact path="/category/detail/:id" component={Category} />
                            <Route path="/category/save" component={CategorySave} />
                            <Route exact path="/order" component={Order} />
                            <Route path="/order/detail/:id" component={OrderDetail} />
                            <Route path="/user" component={User} />
                        </Home>
                        <Redirect from="/" to="/product"/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById("root")
)