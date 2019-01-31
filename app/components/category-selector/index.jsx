import React from 'react'
import Service from 'service/index.js'

import './index.scss'

export default class CategorySelector extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstList: [],
            firstId: 0,
            secList: [],
            secId: 0
        }
    }

    componentDidMount() {
        this.getFirst()
    }
    async getFirst() {
        let res = await Service.getCategory()
        if(res.status === 200 && res.data.status === 0) {
            this.setState({
                firstList: res.data.data
            })
        }
    }
    firstChange(e) {
        let value = e.target.value || 0
        this.setState({
            firstId: value,
            secList: [],
            secId: 0
        }, () => {
            this.getSecond()
            this.onPropsCategoryChange()
        })
    }
    async getSecond() {
        let res = await Service.getCategory({
            id: this.state.firstId
        })
        if(res.status === 200 && res.data.status === 0) {
            this.setState({
                secList: res.data.data
            })
        }
    }
    secChange(e) {
        let value = e.target.value || 0
        this.setState({
            secId: value
        }, () => this.onPropsCategoryChange())
    }
    onPropsCategoryChange() {
        if(typeof this.props.onCategoryChange !== 'function') return
        if(this.state.secId) {
            this.props.onCategoryChange(this.state.secId, this.state.firstId)
        } else {
            this.props.onCategoryChange(this.state.firstId, 0)
        }
    }

    render(){
        return (
            <div className="col-md-10">
                <select className="form-control selector"
                    onChange={e => this.firstChange(e)}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstList && this.state.firstList.map(category => {
                            return (
                                <option value={category.id} key={category.id}>{category.name}</option>
                            )
                        })
                    }
                </select>
                    {   this.state.secList.length > 0 &&
                        <select className="form-control selector" onChange={e => this.secChange(e)}>
                            <option value="">请选择二级分类</option>
                            {
                                this.state.secList.map(category => {
                                    return (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    )
                                })
                            }
                        </select>
                    }
            </div>
        )
    }
}