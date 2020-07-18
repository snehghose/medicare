import React, { Component } from 'react';
import ManageCategory from './ManageCategory';
import CategoryService from '../../services/CategoryService';
import '../Employee.css'

class ManageCategories extends Component {
    constructor(props) {
        super(props)
        this.state={categories:[], category:{name:'',image:''}}
        this.handleChange=this.handleChange.bind(this)
        this.handleAdd=this.handleAdd.bind(this)
    }

    async componentDidMount() {
        this.setState({ categories: await CategoryService.getAllCategories()});
    }

    handleChange(event) {
        event.preventDefault();
        var category=this.state.category;
        category[event.target.name]=event.target.value;
        this.setState({category:category})
    }

    async handleAdd(event) {
        event.preventDefault()
        await CategoryService.addCategory(this.state.category)
        window.location.reload(false)
    }

    render(){
        const categories=this.state.categories;
        return (
            <div>
                <div className="row mb-3">
                    <span className="ml-5">
                        <h4>Categories</h4>
                    </span>
                    <span className="float-right ml-auto mr-5 pointer"  data-toggle="collapse" data-target="#add-category">
                        <i className="material-icons">playlist_add</i> Add
                    </span>
                </div>
                <ul className="list-group">
                    <li id="add-category" className="list-group-item list-group-item-action collapse justify-content-between mt-1">
                        <form>
                            <div className="form-group">
                                <h5>Add New Category</h5>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-12 col-md-6 my-2">
                                    <label>Category Name</label>
                                    <input className="form-control" type="text" placeholder="Enter Category Name" name="name" onChange={this.handleChange}/>
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Image URL</label>
                                    <input className="form-control" type="text" placeholder="Enter Image URL" name="image" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group my-2">
                                <button className="btn btn-success" onClick={this.handleAdd}  data-toggle="collapse">Add</button>
                            </div>
                        </form>
                    </li>
                </ul>
                <div id="accordion">
                    <ul className="list-group">
                        {categories.map(category=>(
                            <ManageCategory key={category.id} category={category}/>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ManageCategories;