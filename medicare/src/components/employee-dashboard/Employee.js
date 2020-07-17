import React from 'react';
import './Employee.css'
import ManageProducts from './manage-products/ManageProducts';
import ManageCategories from './manage-categories/ManageCategories';
import ManageOffers from './manage-offers/ManageOffers';

const Employee = () => (
    <>
    <div className="row justify-content-center">
        <div className="col-12 col-sm-9 col-md-9">
            <nav className="nav nav-pills nav-justified mb-5">
                <a className="nav-item nav-link active" data-toggle="pill" href="#category">Manage Categories</a>
                <a className="nav-item nav-link" data-toggle="pill" href="#product">Manage Products</a>
                <a className="nav-item nav-link" data-toggle="pill" href="#offer">Manage Offers</a>
            </nav>
        </div>
        <div className="col-12 col-sm-9 col-md-9">
            <div className="tab-content">
                <div className="tab-pane active" id="category">
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
    </>
)

export default Employee;