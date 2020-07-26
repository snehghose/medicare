import React, { Component } from 'react';
import UserService from '../../services/UserService';
import NotFound from '../not-found/NotFound';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state={
            disabled:true,
            user:JSON.parse(sessionStorage.getItem('user')),
            flag:false,
            errors:{
                firstName:'',
                lastName:'',
                dateOfBirth:'',
                contact:''
            }
        }
        this.handleEdit=this.handleEdit.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleSave=this.handleSave.bind(this)
    }

    handleEdit(event) {
        event.preventDefault();
        this.setState({disabled:!this.state.disabled,flag:false})
    }

    handleChange(event) {
        event.preventDefault();
        var user=this.state.user;
        var errors=this.state.errors;
        const {name,value} =event.target;
        user[name]=value;
        switch(name) {
            case 'firstName':
                errors.firstName=value.length>0?'':'First Name is required';
                break;
            case 'lastName':
                errors.lastName=value.length>0?'':'Last Name is required';
                break;
            case 'dateOfBirth':
                errors.dateOfBirth=value.length>0?'':'Date Of Birth is required';
                break;
            case 'contact':
                errors.contact=isNaN(value)||value.length!=10?'Invalid contact number':'';
                break;
        }
        this.setState({user:user, errors:errors})
    }

    async handleSave(event) {
        event.preventDefault();
        var errors=this.state.errors;
        const user=this.state.user;
        let flag=0;
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag=1;
        });
        if(flag===0) {
            sessionStorage.setItem('user',JSON.stringify(user))
            const check=await UserService.updateUser();
            if(check===true)
            this.setState({disabled:true, flag:true})
        }
        else
        this.setState({errors:errors})
    }

    render() {
        if(JSON.parse(sessionStorage.getItem('user'))===null)
        return (<NotFound/>)
        const user=this.state.user;
        var date=user.dateOfBirth[0]+"-"
        if(user.dateOfBirth[1]<10)
        date+='0'
        date+=user.dateOfBirth[1]+"-"
        if(user.dateOfBirth[2]<10)
        date+='0'
        date+=user.dateOfBirth[2]
        
        return(
            <div className="container middle">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                        <div className="row mb-3">
                            <span className="ml-3">
                                <h4>My Profile</h4>
                            </span>
                            <span className="float-right ml-auto mr-3" onClick={this.handleEdit}>
                                <i className="material-icons">edit</i> Edit
                            </span>
                        </div>
                        <div className="card mb-2">
                            <div className="card-body">
                                <form>
                                {this.state.flag && (
                                <div className="alert alert-success text-center mb-3 border border-success">
                                    Updated successfully
                                </div>)}
                                    <div className="form-group row">
                                        <div className="col-12">
                                            <label>User ID</label>
                                            <input className="form-control" type="text" name="userName" value={user.userId} disabled={true} onChange={this.handleChange}></input>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <label>First Name</label>
                                            <input className="form-control" type="text" name="firstName" value={user.firstName} disabled={this.state.disabled} onChange={this.handleChange}></input>
                                            {this.state.errors.firstName.length>0 && <small className="text-danger">{this.state.errors.firstName}</small>}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label>Last Name</label>
                                            <input className="form-control" type="text" name="lastName" value={user.lastName} disabled={this.state.disabled} onChange={this.handleChange}></input>
                                            {this.state.errors.lastName.length>0 && <small className="text-danger">{this.state.errors.lastName}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <label>Date of Birth</label>
                                            <input className="form-control" type="date" name="dateOfBirth" value={date} disabled={this.state.disabled} onChange={this.handleChange}></input>
                                            {this.state.errors.dateOfBirth.length>0 && <small className="text-danger">{this.state.errors.dateOfBirth}</small>}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label>Contact Number</label>
                                            <input className="form-control" type="text" name="contact" value={user.contact} disabled={this.state.disabled} onChange={this.handleChange}></input>
                                            {this.state.errors.contact.length>0 && <small className="text-danger">{this.state.errors.contact}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="ml-3 mt-2">
                                            <button className="btn btn-info" disabled={this.state.disabled} onClick={this.handleSave}>Save</button>
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

export default Profile;