import React from 'react'
import Service from 'service/index.js'
import './index.scss'

import PageTitle from 'components/page-title/index.jsx'
import CategorySelector from 'components/category-selector/index.jsx'

export default class Save extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            categoryId: 0,
            parentCategoryId: 0,
            imgList: []
        }
    }
    changeCategory(id,parentId){
        this.setState({
            categoryId: id,
            parentCategoryId: parentId
        })
    }
    uploadImg() {
        let uploadImgInput = document.getElementById('uploadImgInput')
        uploadImgInput.click()
    }
    async onChangeImg(e) {
        let file = e.target.files[0]
        let formData = new FormData()
        formData.append('file', file)
        let res = await Service.uploadImg(formData)
        if(res.status === 200 && res.data.status === 0) {
            this.state.imgList.push(res.data.data)
            this.setState({
                imgList: this.state.imgList
            })
        }
        console.log(this.state.imgList);
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品名称"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品描述"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector onCategoryChange={(id,parentId) => {this.changeCategory(id,parentId)}}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-2">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="价格"/>
                                    <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-2">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="库存" />
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
                                        this.state.imgList.map(img => {
                                            return (
                                                <img className="product_img" src={img.url} key={img.uri}/>
                                            )
                                        })
                                    }
                                </div>
                            }
                            <div className="col-md-10">
                                <input id="uploadImgInput" type="file" name="上传图片" accept="image/gif, image/jpeg, image/png, image/jpg" onChange={e => this.onChangeImg(e)}/>
                                <button onClick={e => this.uploadImg(e)}>上传图片</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <div className="col-md-10">
                                <input id="uploadImgInput" type="file" name="上传图片" accept="image/gif, image/jpeg, image/png, image/jpg" onChange={e => this.onChangeImg(e)}/>
                                <button onClick={e => this.uploadImg(e)}>上传图片</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-5">
                            <button className="btn btn-info">添加</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}