import React from 'react'
import { Link, NavLink } from 'react-router-dom'

require('./index.scss')

class Side extends React.Component{
    render() {
        return (
            <div className="navbar-default navbar-side" role="navigation">
                <div className="sidebar-collapse">
                    <ul className="nav" id="main-menu">
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-dashboard"></i> 首页</NavLink>
                        </li>
                        <li>
                            <NavLink to="/product" activeClassName="active-menu">
                                <i className="fa fa-shopping-bag"></i>商品管理
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/product-category" activeClassName="active-menu">
                                <i className="fa fa-list"></i>品类管理
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/order" activeClassName="active-menu">
                                <i className="fa fa-edit"></i> 订单管理
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user" activeClassName="active-menu">
                                <i className="fa fa-users"></i> 用户管理
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Side