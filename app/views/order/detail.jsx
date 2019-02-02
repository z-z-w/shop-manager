import React from 'react'
import Service from 'service/index.js'
import './index.scss'

import PageTitle from 'components/page-title/index.jsx'
import CategorySelector from 'components/category-selector/index.jsx'

export default class Detail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.location.state.item
        }
    }
    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="订单详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderNo}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.receiverName}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件地址</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.address}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">￥{this.state.payment}</p>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="15%">商品图片</th>
                                    <th width="40%">商品信息</th>
                                    <th width="15%">单价</th>
                                    <th width="15%">数量</th>
                                    <th width="15%">合计</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.orderItemVoList.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                <td>
                                                    <img className="p-img"
                                                         src={item.productImage}
                                                         alt={item.productName} />
                                                </td>
                                                <td>{item.productName}</td>
                                                <td>￥{item.currentUnitPrice}</td>
                                                <td>{item.quantity}</td>
                                                <td>￥{item.totalPrice}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}