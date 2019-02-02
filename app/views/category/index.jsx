import React from 'react'
import {Link} from "react-router-dom"
import Service from 'service/index.js'

import './index.scss'

import PageTitle from 'components/page-title/index.jsx'

export default class Category extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            parentId: this.props.match.params.id || 0,
            list: []
        }
    }
    componentDidMount() {
        this.getCategory()
    }
    async getCategory() {
        let res = await Service.getCategory({
            id: this.state.parentId
        })
        if (res.status === 200 && res.data.status === 0) {
            let data = res.data.data
            this.setState({
                parentId: data[0].parentId,
                list: data
            })
        }
    }
    async changeName(category) {
        let msg = prompt("请输入新的品类名称", category.name)
        if (msg) {
            let res = await Service.setCategoryName({
                _id: category._id,
                name: msg
            })
            if(res.status === 200 && res.data.status === 0) {
                alert("更新品类名称成功")
                this.getCategory()
            } else {
                alert("更新品类名称失败")
            }
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="save_container">
                        <Link to="/category/save" className="btn btn-info">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12"><p>当前商品分类ID：{this.state.parentId}</p></div>
                    {
                        this.state.list.length > 0
                            ? <div className="col-md-12">
                                <table className="table table_bg table-bordered">
                                    <thead>
                                        <tr>
                                            <th width="10%">id</th>
                                            <th width="70%">品类名称</th>
                                            <th width="20%">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.list.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{ item.id }</td>
                                                    <td>{ item.name }</td>
                                                    <td>
                                                        <a href="javascript:;" className="opear"
                                                           onClick={()=>{this.changeName(item)}}>修改名称</a>
                                                        {
                                                            !this.props.match.params.id &&
                                                            <Link to={`/category/detail/${item.id}`} className="opear">查看子类</Link>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                                </div>
                            : <div className="col-md-12 text-center hint">
                                <p>该品类下暂无子品类</p>
                            </div>
                    }

                </div>
            </div>
        )
    }
}

