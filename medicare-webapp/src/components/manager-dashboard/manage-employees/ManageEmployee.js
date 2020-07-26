import React, { Component } from 'react';
import UserService from '../../services/UserService';

class ManageEmployee extends Component {
    constructor(props) {
        super(props)
        this.state={employee:this.props.employee}
        this.handleDelete=this.handleDelete.bind(this)
    }

    async handleDelete(event) {
        await UserService.deleteUser(this.state.employee.userId)
        window.location.reload(false)
    }

    render() {
        const employee=this.state.employee;
        var date=new Date(employee.dateOfBirth[0],employee.dateOfBirth[1]-1,employee.dateOfBirth[2])
        var dateString=date.toLocaleDateString("en",{month:"short", day:"2-digit", year:"numeric"})
        return (
            <li className="list-group-item list-group-item-action pointer" data-toggle="tooltip" title="Click to view">
                <div className="row">
                  <div className="col-7 my-auto text-size"><strong className="ml-5">{employee.userId}</strong></div>
                    <div className="col-5 my-auto p-1">
                        <div className="pointer text-danger mr-5 p-2 float-right pointer" data-toggle="tooltip" title="Delete" onClick={this.handleDelete}>
                            <i className="material-icons">delete_forever</i>
                        </div>
                        <div className="pointer text-success mr-5 p-2 float-right pointer" data-toggle="tooltip" title="View Details" data-target={'#'+employee.userId} data-toggle="collapse">
                            <b><i className="material-icons font-weight-bold">expand_more</i></b>
                        </div>
                    </div>
                </div>
                <div id={employee.userId} className="collapse justify-content-between mt-1" data-parent="#accordion3">
                    <hr/>
                    <div className="row text-center">
                        <div className="col-12 col-sm-4">
                            <div className="row my-2">
                            <div className="col-6 col-sm-12 my-auto"><b>Name</b></div>
                            <div className="col-6 col-sm-12 my-auto">{employee.firstName+" "+employee.lastName}</div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-4">
                        <div className="row my-2">
                            <div className="col-6 col-sm-12 my-auto"><b>Contact Number</b></div>
                            <div className="col-6 col-sm-12 my-auto">{employee.contact}</div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-4">
                        <div className="row my-2">
                            <div className="col-6 col-sm-12 my-auto"><b>Date of Birth</b></div>
                            <div className="col-6 col-sm-12 my-auto">{dateString}</div>
                        </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default ManageEmployee;