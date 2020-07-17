import React, { Component } from 'react';
import UserService from '../../services/UserService';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state={disabled:true,user:JSON.parse(sessionStorage.getItem('user')),flag:false}
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
        var user={...this.state.user}
        user[event.target.name]=event.target.value;
        this.setState({user:user})
    }

    handleSave(event) {
        event.preventDefault();
        sessionStorage.setItem('user',JSON.stringify(this.state.user))
        UserService.updateUser();
        this.setState({disabled:true, flag:true})
    }

    render() {
        const user=this.state.user;
        var date=user.dateOfBirth[0]+"-"
        if(user.dateOfBirth[1]<10)
        date+='0'
        date+=user.dateOfBirth[1]+"-"
        if(user.dateOfBirth[2]<10)
        date+='0'
        date+=user.dateOfBirth[2]
        
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-10 col-lg-8 col-xl">
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
                                        <label for="userId">User ID</label>
                                        <input className="form-control" type="text" name="userName" value={user.userId} disabled={true} onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 col-md-6">
                                        <label for="firstName">First Name</label>
                                        <input className="form-control" type="text" name="firstName" value={user.firstName} disabled={this.state.disabled} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label for="lastName">Last Name</label>
                                        <input className="form-control" type="text" name="lastName" value={user.lastName} disabled={this.state.disabled} onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 col-md-6">
                                        <label for="dateOfBirth">Date of Birth</label>
                                        <input className="form-control" type="date" name="dateOfBirth" value={date} disabled={this.state.disabled} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label for="contact">Contact Number</label>
                                        <input className="form-control" type="text" name="contact" value={user.contact} disabled={this.state.disabled} onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="ml-3 mt-2">
                                        <button className="btn btn-success" disabled={this.state.disabled} onClick={this.handleSave}>Save</button>
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