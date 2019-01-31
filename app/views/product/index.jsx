import React from 'react'
import {Link} from "react-router-dom"
import Service from 'service/index.js'

import './index.scss'

import PageTitle from 'components/page-title/index.jsx'
import Pagination from 'components/pagination/index.jsx'

class Product extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            total: 0,
            userList: []
        }
    }
    componentDidMount() {
        this.getUsers()
    }
    async getUsers() {
        let res = await Service.getUsers({pageNum: this.state.pageNum})
        if (res.status === 200 && res.data.status === 0) {
            let data = res.data.data
            this.setState({
                total: data.total,
                userList: data.list
            })
        }
    }
    changePageNum(page) {
        this.setState({
            pageNum: page,
        }, () => this.getUsers())
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="save_container">
                        <Link to="/product/save" className="btn btn-info">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <td>_id</td>
                                <td>用户名</td>
                                <td>电话</td>
                                <td>邮箱</td>
                                <td>注册时间</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.userList && this.state.userList.map((user) => {
                                    if (!user.isAdmin) {
                                        return (
                                            <tr key={user._id}>
                                                <td>{ user._id }</td>
                                                <td>{ user.username }</td>
                                                <td>{ user.phone }</td>
                                                <td>{ user.email }</td>
                                                <td>{ new Date(+user.createTime).toLocaleString() }</td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination current={this.state.pageNum} total={this.state.total} pageSize={10}
                            onChange={(page) => this.changePageNum(page)}/>
            </div>
        )
    }
}

export default Product