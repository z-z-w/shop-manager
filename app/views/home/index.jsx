import React from 'react'

import './index.scss'

import Header from 'components/header/index.jsx'
import Side from 'components/side/index.jsx'
import Wrapper from 'components/wrapper/index.jsx'

class Home extends React.Component{
    render() {
        return (
            <div id="wrapper">
                <Header/>
                <Side/>
                <Wrapper/>
            </div>
        )
    }
}

export default Home