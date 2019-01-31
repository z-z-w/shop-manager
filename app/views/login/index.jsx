import React from 'react'
import Service from 'service/index.js'

import './index.scss'

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            warning: ''
        }
    }

    onInputChange(e) {
        let target = e.target
        this.setState({
            [target.name]: target.value
        })
    }
    async onSubmit() {
        if(!this.state.username) {
            this.setState({
                warning: '用户名不能为空'
            })
            return
        } else if (!this.state.password) {
            this.setState({
                warning: '密码不能为空'
            })
            return
        }
        let res = await Service.login({
            username: this.state.username,
            password: this.state.password
        })
        if(res.status === 200 && res.data.status === 0) {
            this.props.history.push("/product")
        } else {
            this.setState({
                warning: res.data.msg
            })
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default login-panel">
                        <div className="panel-title login-title">后台 - 登陆</div>
                        <div className="panel-body">
                                <div className="form-group">
                                    <label htmlFor="username">用户名</label>
                                    <input type="text" className="form-control" id="username"
                                           placeholder="请输入用户名" name="username"
                                            onChange={e => this.onInputChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">密码</label>
                                    <input type="password" className="form-control" id='password'
                                           placeholder="请输入密码" name="password"
                                           onChange={e => this.onInputChange(e)}
                                    />
                                </div>
                                {   this.state.warning &&
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">{this.state.warning}</div>
                                    </div>
                                }
                                <button className="btn btn-default" onClick={e => this.onSubmit(e)}>
                                    登陆
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

