import React from 'react'

import './index.scss'

class Header extends React.Component{
    onLogout() {

    }
    render() {
        return (
            <nav className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">
                        <i className="fa fa-gear"></i>
                        <strong>商城后台</strong>
                    </a>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a href="javascript:;" onClick={() => this.onLogout()}>
                                    <i className="fa fa-sign-out fa-fw"></i> Logout
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header