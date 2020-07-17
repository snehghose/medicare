import React, { Component } from 'react';
import '../Employee.css'
import CategoryService from '../../services/CategoryService';

class ManageCategory extends Component {
    constructor(props) {
        super(props)
        this.state={category:this.props.category}
        this.handleChange=this.handleChange.bind(this)
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
    }

    handleChange(event) {
        event.preventDefault();
        var category=this.state.category;
        category[event.target.name]=event.target.value;
        this.setState({category:category})
    }

    async handleUpdate(event) {
        event.preventDefault();
        await CategoryService.updateCategory(this.state.category)
        window.location.reload(false)
    }

    async handleDelete(event) {
        event.preventDefault();
        await CategoryService.deleteCategory(this.state.category.id)
        window.location.reload(false)
    }

    render(){
    const category=this.state.category;
    return(
        <li className="list-group-item list-group-item-action">
            <div className="row">
                <div className="col-4 col-sm-3 col-md-2 col-xl-1 text-center my-auto">
                    <img className="img-fluid pic-size" src={category.image} alt={category.name}/>
                </div>
                <div className="col-4 col-sm-5 col-md-5 col-xl-6 ml-1 my-auto">
                    <strong className="text-size">{category.name}</strong>
                </div>
                <div className="col-3 col-sm-3 col-md-4 my-auto">
                    <div className="text-danger float-right ml-4 pointer" data-toggle="tooltip" data-placement="top" title="Delete" onClick={this.handleDelete}>
                        <i className="material-icons">delete_forever</i>
                    </div>
                    <div className="text-primary float-right pointer" data-toggle="tooltip" data-placement="top" title="Edit" data-toggle="collapse" data-target={'#'+category.id}>
                        <i className="material-icons">edit</i>
                    </div>
                </div>
            </div>
            <div id={category.id} className="collapse justify-content-between mt-1" data-parent="#accordion">
                <hr/>
                <form>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Category Name</label>
                            <input className="form-control" type="text" value={category.name} name="name" onChange={this.handleChange}/>
                        </div>
                        <div className="col-6">
                            <label>Image URL</label>
                            <input className="form-control" type="text" value={category.image} name="image" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success" onClick={this.handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </li>
    )
    }
}

export default ManageCategory;