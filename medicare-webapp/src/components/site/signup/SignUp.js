import React, { Component } from 'react';
import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:{
                userId:'',
                firstName:'',
                lastName:'',
                dateOfBirth:'',
                contact:'',
                password:''
            },
            password2:'',
            errors:{
                userId:'',
                firstName:'',
                lastName:'',
                dateOfBirth:'',
                contact:'',
                password:'',
                password2:''
            }
        };
        this.handleChange=this.handleChange.bind(this);
        this.handlePassword=this.handlePassword.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    async handleChange(event) {
        var user=this.state.user;
        var errors=this.state.errors;
        const {name,value}=event.target;
        user[name]=value;
        switch(name) {
            case 'userId':
                errors.userId=value.length<5?'UserId should have atleast 5 characters':'';
                errors.userId=value.length>4 && await UserService.checkUserId(value)?'UserId already exists':errors.userId;
                break;
            case 'firstName':
                errors.firstName=value.length>0?'':'FirstName is required';
                break;
            case 'lastName':
                errors.lastName=value.length>0?'':'LastName is required';
                break;
            case 'dateOfBirth':
                errors.dateOfBirth=value.length>0?'':'DateOfBirth is required';
                break;
            case 'contact':
                errors.contact=isNaN(value)||value.length!=10?'Invalid contact number':'';
                break;
            case 'password':
                errors.password=value.length<8?'Password should have atleast 8 characters':'';
                break;
        }
        this.setState({user:user, errors:errors});
    }

    handlePassword(event) {
        event.preventDefault();
        const value=event.target.value;
        var errors=this.state.errors;
        errors.password2=value===this.state.user.password?'':'Passwords do not match';
        this.setState({password2:value,errors:errors})
    }

    async handleSubmit(event){
        event.preventDefault();
        var errors=this.state.errors;
        const user=this.state.user;
        let flag=0;
        Object.keys(user).forEach(key=>{
            errors[key]=user[key].length>0?'':key.charAt(0).toUpperCase()+key.slice(1)+' is required';
        })
        errors.password2=this.state.password2.length>0?'':'Retype password';
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag=1;
        });
        if(flag===0) {
            await AuthService.signup(user)
            this.props.history.push('/login');
        }
        else
        this.setState({errors:errors})
    }

    render(){
        var date=(new Date()).toISOString().substring(0,10);
        return(
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                        <div className="row ml-1 mb-3">
                            <h3>Sign Up</h3>
                        </div>
                        <div className="card mb-2">
                            <div className="card-body">
                                <form>
                                    <div className="form-group row">
                                        <div className="col-12">
                                            <label for="userId">User ID</label>
                                            <input className="form-control" type="text" name="userId" placeholder="Enter a username" onChange={this.handleChange}></input>
                                            {this.state.errors.userId.length>0 && <small className="text-danger">{this.state.errors.userId}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <label for="firstName">First Name</label>
                                            <input className="form-control" type="text" name="firstName" placeholder="Enter First Name" onChange={this.handleChange}></input>
                                            {this.state.errors.firstName.length>0 && <small className="text-danger">{this.state.errors.firstName}</small>}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label for="lastName">Last Name</label>
                                            <input className="form-control" type="text" name="lastName" placeholder="Enter Last Name" onChange={this.handleChange}></input>
                                            {this.state.errors.lastName.length>0 && <small className="text-danger">{this.state.errors.lastName}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <label for="dateOfBirth">Date of Birth</label>
                                            <input className="form-control" type="date" name="dateOfBirth" max={date} onChange={this.handleChange}></input>
                                            {this.state.errors.dateOfBirth.length>0 && <small className="text-danger">{this.state.errors.dateOfBirth}</small>}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label for="contact">Contact Number</label>
                                            <input className="form-control" type="text" name="contact" placeholder="Enter Contact Number" onChange={this.handleChange}></input>
                                            {this.state.errors.contact.length>0 && <small className="text-danger">{this.state.errors.contact}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <label for="password">Password</label>
                                            <input className="form-control" type="password" name="password" placeholder="Enter Password" onChange={this.handleChange}></input>
                                            {this.state.errors.password.length>0 && <small className="text-danger">{this.state.errors.password}</small>}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label for="confirmPassword">Confirm Password</label>
                                            <input className="form-control" type="password" name="password2" placeholder="Retype Password" onChange={this.handlePassword}></input>
                                            {this.state.errors.password2.length>0 && <small className="text-danger">{this.state.errors.password2}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <button className="btn btn-info" onClick={this.handleSubmit}>Sign Up</button>
                                        </div>
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

export default SignUp;