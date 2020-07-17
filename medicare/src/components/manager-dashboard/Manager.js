import React from 'react';
import './Manager.css';
import ManageEmployees from './manage-employees/ManageEmployees';

const Manager = () => (
    <>
    <div className="container mt-2 mb-5">
    <div className="row">
        <div className="col-12 col-md-6">
            <h4>Managers</h4>
        </div>
        <div className="col-12 col-md-6 text-right">
            <div className="btn text-light btn-success">Add new employee</div>
        </div>
    </div>
<div className="mb-4">
    <hr/>
</div>

<div className="row">
    <div className="col-12" >
        <div className="container" >

            <ManageEmployees/>
            <ManageEmployees/>
            <ManageEmployees/>


        </div>
    </div>
</div>
</div>
</>
)

export default Manager;