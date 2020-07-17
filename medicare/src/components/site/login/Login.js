import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state={
            userId:'',
            password:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    

    handleChange(event) {
        let item={...this.state};
        item[event.target.name]=event.target.value;
        this.setState(item);
    }

    async handleLogin(event) {
        event.preventDefault();
        AuthService.login(this.state.userId, this.state.password)
        .then(()=>{
            const auth=JSON.parse(sessionStorage.getItem('auth'))
                switch(auth.role) {
                    case 'ROLE_CUSTOMER':
                        this.props.history.push("/");
                        window.location.reload(false);
                        break;
                    case 'ROLE_EMPLOYEE':
                        this.props.history.push("/employee");
                        window.location.reload(false);
                        break;
                    case 'ROLE_ADMIN':
                        this.props.history.push("/manager");
                        window.location.reload(false)
                        break;
                    default:
                        this.props.history.push("/");
                        break;
                }
            }).catch(error=>this.props.history.push('/'))
        
        
        
        
    }
    render() {
        return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-10 col-lg-8">
                    <div className="card mb-2">
                        <div className="card-header">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleLogin}>
                                <div className="form-group">
                                    <label>User ID</label>
                                    <input className="form-control" type="text" name="userId" placeholder="Enter User ID" onChange={this.handleChange}></input>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input className="form-control" type="password" name="password" placeholder="Enter Password" onChange={this.handleChange}></input>
                                </div>
                                <div className="form-group">
                                    <input className="btn btn-success" type="submit" value="Login"/>
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