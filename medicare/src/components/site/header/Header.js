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
        console.log(user)
        return(
                <div className="mb-4">
                    <nav className="navbar navbar-light bg-success navbar-expand-sm">
                        <h3>Medicare</h3>
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#navcontent">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navcontent">
                            <ul className="navbar-nav ml-auto">
                                {user==null &&
                                (<li className="nav-item">
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                </li>)}
                                {user==null &&
                                (<li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>)}
                                {user!=null && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cart">My Cart</Link>
                                    </li>
                                )}
                                {user!=null && (
                                    <li className="nav-item dropdown" >
                                        <a className="nav-link dropdown-toggle" role="button" id="dropdownMenuLink"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {user.firstName} {user.lastName}
                                                </a>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                            <button className="dropdown-item" onClick={this.handleProfile}>My Profile</button>
                                            <button className="dropdown-item" onClick={this.handleChangePassword}>Change Password</button>
                                            {user.role==='ROLE_CUSTOMER' && (<button className="dropdown-item" onClick={this.handlePurchaseHistory}>My Orders</button>)}
                                            <div className="dropdown-divider"></div>
                                            <button className="dropdown-item" onClick={this.handleLogout}>Logout</button>
                                        </div>
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