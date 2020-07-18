import React, { Component } from 'react';
import './Manager.css';
import ManageEmployees from './manage-employees/ManageEmployees';

class Manager extends Component {
    render() {
        return (
    <div className="container mt-2 mb-5">
    <div className="row justify-content-center">
        <div className="col-5 my-auto">
            <h4>Welcome!!!</h4>
        </div>
        <div className="col-7 text-right my-auto">
            <div className="btn text-light btn-success">Add Employee</div>
        </div>
    </div>
<div className="mb-4">
    <hr/>
</div>

<div className="row mb-3">
                    <span className="ml-5">
                        <h4>Manage Employees</h4>
                    </span>
                    <span className="float-right ml-auto mr-5 pointer">
                        <i className="material-icons">playlist_add</i> Add
                    </span>
                </div>
            <div id="accordion2">
                <ul className="list-group">
                    <ManageEmployees/>
                </ul>
            </div>
</div>
)
        }
    }

export default Manager;