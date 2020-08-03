import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthService from '../../services/AuthService';

class Header extends Component{

    constructor(props) {
        super(props);
        this.handleLogout=this.handleLogout.bind(this);
        this.handleProfile=this.handleProfile.bind(this);
        this.handleChangePassword=this.handleChangePassword.bind(this);
        this.handlePurchaseHistory=this.handlePurchaseHistory.bind(this);
    }

    async handleLogout(event){
        event.preventDefault();
        AuthService.logout();
        this.props.history.push("/");
        window.location.reload(false)
    }

    handleProfile(event) {
        event.preventDefault();
        this.props.history.push("/profile")
    }

    handleChangePassword(event) {
        event.preventDefault();
        this.props.history.push("/change-password")
    }

    handlePurchaseHistory(event) {
        event.preventDefault();
        this.props.history.push("/purchase-history")
    }

    render(){
        const user=JSON.parse(sessionStorage.getItem('user'))
        var path="/";
        if(user!=null) {
            switch(user.role) {
                case 'ROLE_EMPLOYEE':
                    path="/employee";
                    break;
                case 'ROLE_ADMIN':
                    path="/manager";
            }
        }
        return(
            <div className="mb-4 header">
                <nav className="navbar header navbar-fixed-top navbar-light bg-info navbar-expand-sm">
                    <div className="nav-item">
                        <Link className="nav-link" to={path}>
                            <h3><i className="material-icons blockquote my-1">add_circle</i> EasyMeds</h3>
                        </Link>
                    </div>
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navcontent">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navcontent">
                        <ul className="navbar-nav ml-auto">
                            {user==null &&
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/signup">Sign Up</Link>
                                </li>}
                            {user==null &&
                                (<li className="nav-item">
                                    <Link className="nav-link text-light" to="/login">Login</Link>
                                </li>)}
                            {user!=null && user.role==='ROLE_CUSTOMER' && (
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/cart">My Cart</Link>
                                </li>)}
                            {user!=null && (
                                <li className="nav-item dropdown text-light">
                                    <a className="nav-link dropdown-toggle" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {user.firstName} {user.lastName}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                        <button className="dropdown-item" onClick={this.handleProfile}>My Profile</button>
                                        <button className="dropdown-item" onClick={this.handleChangePassword}>Change Password</button>
                                        {user.role==='ROLE_CUSTOMER' && (<>
                                            <div className="dropdown-divider"/>
                                            <button className="dropdown-item" onClick={this.handlePurchaseHistory}>My Orders</button>
                                        </>)}
                                    </div>
                                </li>)}
                            {user!=null && (
                                <li className="nav-item">
                                    <div className="nav-link text-light" style={{cursor:'pointer'}} onClick={this.handleLogout}>Logout</div>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Header);