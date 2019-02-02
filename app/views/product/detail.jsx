import React from 'react'
import Service from 'service/index.js'
import './index.scss'

import PageTitle from 'components/page-title/index.jsx'
import CategorySelector from 'components/category-selector/index.jsx'

export default class Detail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.match.params.id,
            categoryId: 0,
            parentCategoryId: 0,
            imgList: [],
            imgDetailList: [],
            name: '',
            desc: '',
            price: '',
            stock: '',
            status: 1
        }
    }
    componentWillMount() {
        if(this.state._id){
            this.getProduct()
        }
    }

    async getProduct() {
        let res = await Service.getProductDetail({
            _id: this.state._id
        })
        if(res.status === 200 && res.data.status === 0) {
            this.setState({
                ...res.data.data
            })
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="商品详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.desc}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector
                            readOnly
                            categoryId = {this.state.categoryId}
                            parentCategoryId = {this.state.parentCategoryId}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-2">
                            <div className="input-group">
                                <input type="number" className="form-control" value={this.state.price}
                                        readOnly/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-2">
                            <div className="input-group">
                                <input type="number" className="form-control" value={this.state.stock}
                                       readOnly/>
                                <span className="input-group-addon" >件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.imgList.length > 0 &&
                                <div className="img_container col-md-10">
                                    {
                                        this.state.imgList.map((img,index) => {
                                            return (
                                                <div className="sub_img" key={img.uri}>
                                                    <img className="product_img" src={img.url}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            {
                                this.state.imgDetailList.length > 0 &&
                                <div className="img_container col-md-10">
                                    {
                                        this.state.imgDetailList.map((img,index) => {
                                            return (
                                                <div className="sub_img detail" key={img.uri}>
                                                    <img className="product_img" src={img.url}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}