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
                            <p className="form-control-static">{this.state.orderId}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{new Date(Number(this.state.orderId)).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.address.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件地址</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.address.address}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderStatus === 1 ? '待收货' : '已完成'}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.payStatus[0]}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">￥{ (this.state.totalPrice / 100).toFixed(2) }</p>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <table className="table table-bordered">
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
                                    this.state.goods.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                <td>
                                                    <img className="p-img"
                                                         src={item.smpic}
                                                         alt={item.name} />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>￥{item.price}</td>
                                                <td>{item.count}</td>
                                                <td>￥{item.price * item.count}</td>
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