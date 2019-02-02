import React from 'react'
import {Link} from "react-router-dom"
import Service from 'service/index.js'

import './index.scss'

import PageTitle from 'components/page-title/index.jsx'
import Pagination from 'components/pagination/index.jsx'

class Order extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            total: 0,
            productList: [],
            q: '',
            isSearching: false
        }
    }
    componentDidMount() {
        this.getOrderList()
    }
    async getOrderList() {
        let res = await Service.getOrderList({pageNum: this.state.pageNum})
        if (res.status === 200 && res.data.status === 0) {
            let data = res.data.data
            this.setState({
                total: data.total,
                productList: data.list
            })
        }
    }
    onChangeQ(e) {
        let value = e.target.value
        this.setState({
            q: value
        })
    }
    async search(flag){
        let pageNum = flag ? 1 : this.state.pageNum
        let res = await Service.searchOrder({
            q: this.state.q,
            pageNum
        })
        if(res.status === 200 && res.data.status === 0) {
            let data = res.data.data
            this.setState({
                pageNum: data.pageNum,
                total: data.total,
                productList: data.lists,
                isSearching: data.isSearching
            })
        } else {
            alert("搜索不到订单，换个关键词试试吧~")
        }
    }
    changePageNum(page) {
        this.setState({
            pageNum: page,
        }, () => {
            this.state.isSearching ? this.search() :this.getOrderList()
        })
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="订单列表">
                </PageTitle>
                <div className="row mb">
                    <div className="col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="订单号"
                                       value={this.state.q} onChange={(e)=>{this.onChangeQ(e)}}/>
                            </div>
                            <button type="button" className="btn btn-default opear"
                                    onClick={() => {this.search(true)}}>
                                查询
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table_bg table-bordered">
                            <thead>
                                <tr>
                                    <th  width="13%">订单号</th>
                                    <th  width="10%">收件人</th>
                                    <th  width="40%">收货地址</th>
                                    <th  width="10%">订单总价</th>
                                    <th  width="15%">创建时间</th>
                                    <th  width="12%">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.productList && this.state.productList.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{ item.orderNo }</td>
                                            <td>{ item.receiverName }</td>
                                            <td>{ item.address }</td>
                                            <td>￥{ item.payment }</td>
                                            <td>{item.createTime}</td>
                                            <td>
                                                <Link to={{pathname: `/order/detail/${item._id}`, state: {item}}} className="opear">查看</Link>
                                            </td>
                                        </tr>
                                    )
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

export default Order