import React from 'react'

import PageTitle from '../page-title/index.jsx'

class Side extends React.Component{
    render() {
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <PageTitle title="首页"/>
                            <ol className="breadcrumb">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Library</a></li>
                                <li className="active">Data</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Side