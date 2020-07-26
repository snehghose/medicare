import React , { Component } from 'react';
import Header from './site/header/Header';
import Customer from './customer-dashboard/Customer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from './products/Products';
import SignUp from './site/signup/SignUp';
import Login from './site/login/Login';
import Employee from './employee-dashboard/Employee';
import Manager from './manager-dashboard/Manager';
import Cart from './customer-dashboard/cart/Cart';
import Profile from './site/profile/Profile';
import ChangePassword from './site/profile/ChangePassword';
import PurchaseHistory from './site/profile/purchase-history/PurchaseHistory';
import './App.css'
import NotFound from './site/not-found/NotFound';

class App extends Component {
  render() {
    return (
        <Router>
          <Header/>
          <Switch>
            <Route path="/" exact={true} component={Customer}/>
            <Route path="/products/:name" exact={true} component={Products}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={Login}/>
            <Route path="/employee" component={Employee}/>
            <Route path="/manager" component={Manager}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/change-password" component={ChangePassword}/>
            <Route path="/purchase-history" component={PurchaseHistory}/>
            <Route path="/**" component={NotFound}/>
          </Switch>
          <nav className="navbar footer navbar-expand-sm text-light bg-info">
            <small>Copyright &copy; 2020 S.G.</small>
          </nav>
        </Router>
    )
  }
}

export default App;