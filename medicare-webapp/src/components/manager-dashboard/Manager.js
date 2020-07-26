import React, { Component } from 'react';
import './Manager.css';
import ManageEmployee from './manage-employees/ManageEmployee';
import UserService from '../services/UserService';
import NotFound from '../site/not-found/NotFound';

class Manager extends Component {
    constructor() {
        super();
        this.state={
            employees : [], 
            newEmployee : {
                firstName:'',
                lastName:'',
                dateOfBirth:'',
                contact:''
            },
            errors:{
                firstName:'',
                lastName:'',
                dateOfBirth:'',
                contact:''
            }
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        this.setState({employees:await UserService.getAllEmployees()})
    }

    handleChange(event) {
        event.preventDefault()
        var employee=this.state.newEmployee;
        var errors=this.state.errors
        const {name,value}=event.target;
        employee[name]=value;
        switch(name) {
            case 'firstName':
                errors.firstName=value.length>0?'':'FirstName is required';
                break;
            case 'lastName':
                errors.lastName=value.length>0?'':'LastName is required';
                break;
            case 'dateOfBirth':
                errors.dateOfBirth=value.length>0?'':'DateOfBirth is required';
                break;
            case 'contact':
                errors.contact=isNaN(value)||value.length!=10?'Invalid contact number':'';
                break;
        }
        this.setState({newEmployee:employee, errors:errors})
    }

    async handleSubmit(event) {
        event.preventDefault()
        var errors=this.state.errors;
        const employee=this.state.newEmployee;
        let flag=0;
        Object.keys(employee).forEach(key=>{
            errors[key]=employee[key].length>0?'':key.charAt(0).toUpperCase()+key.slice(1)+' is required';
        })
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag++;
        });
        if(flag===0) {
            const user=await UserService.addEmployee(this.state.newEmployee)
            if(user!=null)
            alert("New employee added with UserId : "+user.userId+" and Password : \"password\"")
            window.location.reload(false)
        }
        else
        this.setState({errors:errors})
    }

    render() {
        if(JSON.parse(sessionStorage.getItem('user'))===null || JSON.parse(sessionStorage.getItem('user')).role!=='ROLE_ADMIN')
        return (<NotFound/>)
        var date=(new Date()).toISOString().substring(0,10)
        return (
            <div className="container middle mt-2 mb-5">
                <div className="row justify-content-center">
                    <h3>Welcome Manager!</h3>
                </div>
                <div className="mb-4">
                    <hr/>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-sm-7 col-md-5 col-lg-4 text-center my-auto">
                        <h4>Manage Employees</h4>
                    </div>
                    <div className="col-12 col-sm-1 col-md-4 col-lg-5"></div>
                    <div className="col-12 col-sm-4 col-md-3 my-auto text-center pointer" data-toggle="collapse" data-target="#add-employee">
                        <div className="btn btn-info">Add Employee</div>
                    </div>
                </div>
                <ul className="list-group">
                    <li id="add-employee" className="list-group-item list-group-item-action collapse justify-content-between mt-1">
                        <form>
                            <div className="row">
                                <div className="col-12 col-md-6 mb-2">
                                    <label for="firstName">First Name</label>
                                    <input className="form-control" type="text" name="firstName" placeholder="Enter First Name" onChange={this.handleChange}></input>
                                    {this.state.errors.firstName.length>0 && <small className="text-danger">{this.state.errors.firstName}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                    <label for="lastName">Last Name</label>
                                    <input className="form-control" type="text" name="lastName" placeholder="Enter Last Name" onChange={this.handleChange}></input>
                                    {this.state.errors.lastName.length>0 && <small className="text-danger">{this.state.errors.lastName}</small>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 mb-2">
                                    <label for="dateOfBirth">Date of Birth</label>
                                    <input className="form-control" type="date" name="dateOfBirth" max={date} onChange={this.handleChange}></input>
                                    {this.state.errors.dateOfBirth.length>0 && <small className="text-danger">{this.state.errors.dateOfBirth}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                    <label for="contact">Contact Number</label>
                                    <input className="form-control" type="text" name="contact" placeholder="Enter Contact Number" onChange={this.handleChange}></input>
                                    {this.state.errors.contact.length>0 && <small className="text-danger">{this.state.errors.contact}</small>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-12 col-md-6 mb-2">
                                    <button className="btn btn-info" onClick={this.handleSubmit}>Add Employee</button>
                                </div>
                            </div>
                        </form>
                    </li>
                </ul>
                <div id="accordion3">
                    <ul className="list-group">
                        {this.state.employees.map((employee)=>(
                            <ManageEmployee key={employee.userId} employee={employee}/>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Manager;