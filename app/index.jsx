import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {createBrowserHistory} from 'history'

import Home from 'views/home/index.jsx'
import Login from 'views/login/index.jsx'
import User from 'views/user/index.jsx'
import Order from 'views/order/index.jsx'
import Category from 'views/category/index.jsx'
import Product from 'views/product/index.jsx'
import Save from 'views/product/save.jsx'
import Detail from 'views/product/detail.jsx'
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
                            <Route path="/product/save/:id?" component={Save} />
                            <Route path="/product/detail/:id" component={Detail} />
                            <Route path="/category" component={Category} />
                            <Route path="/order" component={Order} />
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