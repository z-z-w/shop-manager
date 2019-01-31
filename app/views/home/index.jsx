import React from 'react'

import './index.scss'

import Header from 'components/header/index.jsx'
import Side from 'components/side/index.jsx'

class Home extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div id="wrapper">
                <Header/>
                <Side/>
                {this.props.children}
            </div>
        )
    }
}

export default Home