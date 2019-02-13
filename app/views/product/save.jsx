import React from 'react'
import Service from 'service/index.js'
import './index.scss'

import PageTitle from 'components/page-title/index.jsx'
import CategorySelector from 'components/category-selector/index.jsx'

export default class Save extends React.Component{
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
    onChangeValue(e, attr) {
        let value = e.target.value
        this.setState({
            [attr]: value
        })
    }
    async onSubmit() {
        if(!this.checkValue()) return
        let res = await Service.saveProduct({
            ...this.state
        })
        if(res.status === 200 && res.data.status === 0) {
            this.props.history.push('/product')
        }
    }
    changeCategory(id,parentId){
        this.setState({
            categoryId: id,
            parentCategoryId: parentId
        })
    }
    uploadImg(id) {
        let uploadImgInput = document.getElementById(id)
        uploadImgInput.click()
    }
    async onChangeImg(e, attr) {
        let file = e.target.files[0]
        let formData = new FormData()
        formData.append('file', file)
        let res = await Service.uploadImg(formData)
        if(res.status === 200 && res.data.status === 0) {
            this.state[attr].push(res.data.data)
            this.setState({
                [attr]: this.state[attr]
            })
        }
    }
    async deleteImg(img, index, attr) {
        this.state[attr].splice(index, 1)
        this.setState({
            [attr]: this.state[attr]
        })
        if(!this.state._id){
            await Service.deleteImg({
                uri: img.uri
            })
        }
    }
    checkValue() {
        let obj = {...this.state}
        if(!obj.name) {
            alert('商品名字不能为空')
            return false
        }
        if(!obj.desc) {
            alert('商品描述不能为空')
            return false
        }
        if(!obj.categoryId) {
            alert('商品分类不能为空')
            return false
        }
        if(!obj.price) {
            alert('商品价格不能为空')
            return false
        }
        if(!obj.stock) {
            alert('商品库存不能为空')
            return false
        }
        if(!obj.imgList.length) {
            alert('商品图片不能为空')
            return false
        }
        if(!obj.imgDetailList.length) {
            alert('商品详情不能为空')
            return false
        }
        return true
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" value={this.state.name}
                                   placeholder="请输入商品名称" onChange={e => this.onChangeValue(e,'name')}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" value={this.state.desc}
                                   placeholder="请输入商品描述" onChange={e => this.onChangeValue(e,'desc')}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector
                            categoryId = {this.state.categoryId}
                            parentCategoryId = {this.state.parentCategoryId}
                            onCategoryChange={(id,parentId) => {this.changeCategory(id,parentId)}}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-2">
                            <div className="input-group">
                                <input type="number" className="form-control" value={this.state.price}
                                       placeholder="价格"  onChange={e => this.onChangeValue(e,'price')}/>
                                    <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-2">
                            <div className="input-group">
                                <input type="number" className="form-control" value={this.state.stock}
                                       placeholder="库存"  onChange={e => this.onChangeValue(e,'stock')}/>
                                    <span className="input-group-addon" >件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.imgList.length > 0 &&
                                <div className="img_container col-md-10 product">
                                    {
                                        this.state.imgList.map((img,index) => {
                                            return (
                                                <div className="sub_img" key={img.uri}>
                                                    <img className="product_img" src={img.url}/>
                                                    <i className="fa fa-close fa-fw" onClick={() => this.deleteImg(img,index, "imgList")}></i>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                            <div className="col-md-10">
                                <input className="img_input" id="uploadImgInput" type="file" accept="image/gif, image/jpeg, image/png, image/jpg" onChange={e => this.onChangeImg(e, "imgList")}/>
                                <button onClick={() => this.uploadImg("uploadImgInput")}>上传图片</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group good_detail">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <div className="col-md-10 mb">
                                <input className="img_input" id="uploadDetailImgInput" type="file" accept="image/gif, image/jpeg, image/png, image/jpg" onChange={e => this.onChangeImg(e, "imgDetailList")}/>
                                <button onClick={() => this.uploadImg("uploadDetailImgInput")}>上传图片</button>
                            </div>
                            {
                                this.state.imgDetailList.length > 0 &&
                                <div className="img_container col-md-10">
                                    {
                                        this.state.imgDetailList.map((img,index) => {
                                            return (
                                                <div className="sub_img detail" key={img.uri}>
                                                    <img className="product_img" src={img.url}/>
                                                    <i className="fa fa-close fa-fw" onClick={() => this.deleteImg(img,index, "imgDetailList")}></i>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <button className="btn btn-info btn_submit" onClick={() => this.onSubmit()}>
                            {this.state._id ? '修改' : '添加'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}