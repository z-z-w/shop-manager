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
    componentWillReceiveProps(nextProps, nextContext) {
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId
        let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
        if (!categoryIdChange && !parentCategoryIdChange) return
        if(nextProps.parentCategoryId === 0) {
            this.setState({
                firstId: nextProps.categoryId,
                secId: 0
            })
        } else {
            this.setState({
                firstId: nextProps.parentCategoryId,
                secId: nextProps.categoryId
            }, () => {
                this.getSecond()
            })
        }
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
    firstChange(e) {
        if(this.props.readOnly) return
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
        if(this.props.readOnly) return
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
                <select className="form-control selector" value={this.state.firstId}
                    onChange={e => this.firstChange(e)} readOnly={this.props.readOnly}>
                    <option>请选择一级分类</option>
                    {
                        this.state.firstList && this.state.firstList.map(category => {
                            return (
                                <option value={category.id} key={category.id}>{category.name}</option>
                            )
                        })
                    }
                </select>
                    {   this.state.secList.length > 0 &&
                        <select className="form-control selector" onChange={e => this.secChange(e)}
                                value={this.state.secId} readOnly={this.props.readOnly}>
                            <option>请选择二级分类</option>
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