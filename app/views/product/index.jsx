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
            productList: []
        }
    }
    componentDidMount() {
        this.getProducts()
    }
    async getProducts() {
        let res = await Service.getProducts({pageNum: this.state.pageNum})
        if (res.status === 200 && res.data.status === 0) {
            let data = res.data.data
            this.setState({
                total: data.total,
                productList: data.list
            })
        }
    }
    changePageNum(page) {
        this.setState({
            pageNum: page,
        }, () => this.getProducts())
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
                        <table className="table table_bg table-bordered">
                            <thead>
                                <tr>
                                    <th width="5%">id</th>
                                    <th width="60%">信息</th>
                                    <th width="10%">价格</th>
                                    <th width="10%">操作</th>
                                    <th width="15%">状态</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.productList && this.state.productList.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{ item._id }</td>
                                            <td>
                                                <p>{ item.name }</p>
                                                <p>{ item.desc }</p>
                                            </td>
                                            <td>￥{ item.price }</td>
                                            {
                                                item.status ?
                                                    <td>
                                                        <span>在售</span>
                                                        <span className="btn btn-info btn-xs opear">下架</span>
                                                    </td> :
                                                    <td>
                                                        <span>已下架</span>
                                                        <span className="btn btn-info btn-xs opear">上架</span>
                                                    </td>
                                            }
                                            <td>
                                                <Link to={`/product/detail/${item._id}`} className="opear">查看</Link>
                                                <Link to={`/product/save/${item._id}`} className="opear">编辑</Link>
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

export default Product