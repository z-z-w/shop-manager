import React from 'react'
import Service from 'service/index.js'
import PageTitle from 'components/page-title/index.jsx'

import './index.scss'

class Category extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstId: 0,
            firstList: [],
            categoryName: ''
        }
    }
    componentDidMount() {
        this.getFirst()
    }
    async getFirst() {
        let res = await Service.getCategory({
            id: this.state.firstId
        })
        if(res.status === 200 && res.data.status === 0) {
            this.setState({
                firstList: res.data.data
            })
        }
    }
    async onSubmit() {
        let res = await Service.addCategory({
            parentId: this.state.firstId,
            name: this.state.categoryName
        })
        if(res.status === 200 && res.data.status === 0) {
            this.props.history.push('/category')
        }
    }
    firstChange(e) {
        let value = e.target.value || 0
        this.setState({
            firstId: value
        })
    }
    onChangeValue(e) {
        let value = e.target.value
        this.setState({
            categoryName: value
        })
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <div className="col-md-2">
                            <select className="form-control selector" value={this.state.firstId}
                                    onChange={e => this.firstChange(e)}>
                                <option>/所有</option>
                                {
                                    this.state.firstList && this.state.firstList.map(category => {
                                        return (
                                            <option value={category.id} key={category.id}>/所有/{category.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">品类名称</label>
                        <div className="col-md-2">
                            <div className="input-group">
                                <input type="text" className="form-control" value={this.state.categoryName}
                                       placeholder="请输入品类名称" onChange={e => this.onChangeValue(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-5">
                            <button className="btn btn-info" onClick={() => this.onSubmit()}>
                                提交
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Category