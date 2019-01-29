import React from 'react'
import ReactDom from 'react-dom'
import {Link, Router, Route, Switch, browserHistory } from "react-router-dom";
import {createBrowserHistory} from 'history'

import Home from 'views/home/index.jsx'

const history = createBrowserHistory()

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/product" component={Home} />
                        <Route path="/product-category" component={Home} />
                        <Route path="/order" component={Home} />
                        <Route path="/user" component={Home} />
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