import React, { Component } from 'react';

class SignUp extends Component {

    newUser = {
        userId:'',
        firstName:'',
        lastName:'',
        dateOfBirth:'',
        contact:'',
        password:'',
        role:'',
        cart:{},
        bills:[]
    };

    constructor(props) {
        super(props);
        this.state={
            user:this.newUser,
            password2:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange=(event)=>{
        let user={...this.state.user};
        user[event.target.name]=event.target.value;
        this.setState({user});
    }

    handlePassword=(event)=>{
        this.setState({password2:event.target.value})
    }

    async handleSubmit(event){
        event.preventDefault();
        const user=this.state.user;
        await fetch('http://localhost:8082/customer',{method:'POST',headers:{
            'Content-Type':'application/json'
        },body:JSON.stringify(user)});
        this.props.history.push('/login')
    }

    render(){
        return(
            <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-10 col-lg-8">
                    <div className="card mb-2">
                        <div className="card-header">
                            <h3>Sign Up</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group row">
                                    <div className="col-12">
                                        <label for="userId">User ID</label>
                                        <input className="form-control" type="text" name="userId" placeholder="Enter a username" onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 col-md-6">
                                        <label for="firstName">First Name</label>
                                        <input className="form-control" type="text" name="firstName" placeholder="Enter First Name" onChange={this.handleChange}></input>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label for="lastName">Last Name</label>
                                        <input className="form-control" type="text" name="lastName" placeholder="Enter Last Name" onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 col-md-6">
                                        <label for="dateOfBirth">Date of Birth</label>
                                        <input className="form-control" type="date" name="dateOfBirth" onChange={this.handleChange}></input>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label for="contact">Contact Number</label>
                                        <input className="form-control" type="text" name="contact" placeholder="Enter Contact Number" onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 col-md-6">
                                        <label for="password">Password</label>
                                        <input className="form-control" type="password" name="password" placeholder="Enter Password" onChange={this.handleChange}></input>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label for="confirmPassword">Confirm Password</label>
                                        <input className="form-control" type="password" name="confirmPassword" placeholder="Retype Password" onChange={this.handlePassword}></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 col-md-6">
                                        <button className="btn btn-success" onClick={this.handleSubmit}>Sign Up</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
        }
    }

export default SignUp;