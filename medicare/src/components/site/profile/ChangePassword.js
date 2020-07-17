import React, { Component } from 'react';
import UserService from '../../services/UserService';

class ChangePassword extends Component {

    constructor(props) {
        super(props)
        this.state={user:JSON.parse(sessionStorage.getItem('user')).userId,password:{oldPassword:'',newPassword:''}}
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(event) {
        event.preventDefault();
        var pwd={...this.state.password}
        pwd[event.target.name]=event.target.value
        this.setState({password:pwd})
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.password);
        
        UserService.updatePassword(this.state.password)
    }

    render() {
        return (
            <div className="container">
    <div className="row justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-8 col-xl-6">
        <div className="row ml-1 mb-3">
                    <h4>
                    Update Password</h4>
                </div>
            <div className="card">
                
                <div className="card-body">
                    <form>
                        {false && <div className="alert alert-success">
                            Updated successfully
                        </div>}
                        {false && <div className="alert alert-danger">
                            Invalid User ID / Password
                        </div>}

                        <div className="form-group">
                            <label>User Id</label>
                            <input className="form-control" type="text" name="userId" disabled={true} value={this.state.user}/>

                        </div>
                        <div className="form-group">
                            <label>Current Password</label>
                            <input className="form-control" type="password" placeholder="Enter current password" name="oldPassword" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="password">New Password</label>
                            <input className="form-control" type="password" placeholder="Enter new password" name="newPassword" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                                <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>
                                    Update
                                </button>
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

export default ChangePassword;