import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:{
                userId:'',
                password:''
            },
            errors:{
                userId:'',
                password:''
            }
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    

    handleChange(event) {
        var user=this.state.user;
        var errors=this.state.errors
        const {name,value}=event.target
        user[name]=value;
        switch(name) {
            case 'userId':
                errors.userId=value.length>0?'':'UserId is required'
                break;
            case 'password':
                errors.password=value.length>0?'':'Password is required'
                break;
        }
        this.setState({user:user,errors:errors});
    }

    async handleLogin(event) {
        event.preventDefault();
        var errors=this.state.errors;
        let flag=0;
        if(this.state.user.userId.length===0)
        errors.userId='UserId is required'
        if(this.state.user.password.length===0)
        errors.password='Password is required'
        Object.values(errors).forEach(value=>{
            if(value.length>0)
            flag++;
        })
        if(flag===0)
        AuthService.login(this.state.user.userId, this.state.user.password);
        else
        this.setState({errors:errors})
    }
    
    render() {
        return (
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                        <div className="row ml-1 mb-3">
                            <h3>Login</h3>
                        </div>
                        <div className="card mb-2">
                            <div className="card-body">
                                <form onSubmit={this.handleLogin}>
                                    <div className="form-group">
                                        <label>User ID</label>
                                        <input className="form-control" type="text" name="userId" placeholder="Enter User ID" onChange={this.handleChange}></input>
                                        {this.state.errors.userId.length>0 && <small className="text-danger">{this.state.errors.userId}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input className="form-control" type="password" name="password" placeholder="Enter Password" onChange={this.handleChange}></input>
                                        {this.state.errors.password.length>0 && <small className="text-danger">{this.state.errors.password}</small>}
                                    </div>
                                    <div className="form-group">
                                        <input className="btn btn-info" type="submit" value="Login"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;