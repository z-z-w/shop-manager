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
            productList: [],
            q: '',
            isSearching: false
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
    async onChangeStatus(_id,status) {
        let info = status ? "确定要上架该商品？" : "确定要下架该商品?"
        let conf = window.confirm(info)
        if (conf) {
            let res = await Service.setSaleStatus({
                _id,
                status
            })
            if (res.status === 200 && res.data.status === 0) {
                alert('修改产品销售状态成功')
                this.getProducts()
            } else {
                alert('修改产品销售状态失败')
            }
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
        let res = await Service.searchProduct({
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
            alert("搜索不到产品，换个关键词试试吧~")
        }
    }
    changePageNum(page) {
        this.setState({
            pageNum: page,
        }, () => {
            this.state.isSearching ? this.search() :this.getProducts()
        })
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
                <div className="row mb">
                    <div className="col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="关键词"
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
                                                        <span className="btn btn-info btn-xs opear"
                                                                onClick={()=>{this.onChangeStatus(item._id,0)}}>
                                                            下架
                                                        </span>
                                                    </td> :
                                                    <td>
                                                        <span>已下架</span>
                                                        <span className="btn btn-info btn-xs opear"
                                                              onClick={()=>{this.onChangeStatus(item._id,1)}}>
                                                            上架
                                                        </span>
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