import React from 'react';
import './Employee.css'
import ManageProducts from './manage-products/ManageProducts';
import ManageCategories from './manage-categories/ManageCategories';
import ManageOffers from './manage-offers/ManageOffers';
import NotFound from '../site/not-found/NotFound';
import '../App.css'

const Employee = () => {
    if(JSON.parse(sessionStorage.getItem('user'))===null || JSON.parse(sessionStorage.getItem('user')).role!=='ROLE_EMPLOYEE')
        return (<NotFound/>)
    else
    return (
        <div className="middle">
    <div className="row justify-content-center">
        <div className="col-12 col-sm-9 col-md-9">
            <nav className="nav nav-pills nav-justified mb-5">
                <a className="nav-item nav-link nav-color my-auto" data-toggle="pill" href="#category"><strong>Manage Categories</strong></a>
                <a className="nav-item nav-link nav-color my-auto" data-toggle="pill" href="#product"><strong>Manage Products</strong></a>
                <a className="nav-item nav-link nav-color my-auto" data-toggle="pill" href="#offer"><strong>Manage Offers</strong></a>
            </nav>
        </div>
        <div className="col-12 col-sm-9 col-md-9">
            <div className="tab-content">
                <div className="tab-pane" id="category">
                    <ManageCategories/>
                </div>
                <div className="tab-pane" id="product">
                    <ManageProducts/>
                </div>
                <div className="tab-pane" id="offer">
                    <ManageOffers/>
                </div>
            </div>
        </div>
    </div>
    </div>
)
}

export default Employee;