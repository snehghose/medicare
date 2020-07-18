import React, { Component } from 'react';
import ManageProduct from './ManageProduct';
import CategoryService from '../../services/CategoryService';
import ProductService from '../../services/ProductService';

class ManageProducts extends Component {
    constructor(props) {
        super(props)
        this.state={products:[], categories:[], product:{name:'', brand:'', manufacturer:'', price:0, image:'', categoryName:''}}
        this.handleChange=this.handleChange.bind(this)
        this.handleAdd=this.handleAdd.bind(this)
    }
    
    async componentDidMount() {
        this.setState({ products: await ProductService.getAllProducts(),categories: await CategoryService.getAllCategories()});
    }
    
    handleChange(event) {
        event.preventDefault();
        var product=this.state.product;
        product[event.target.name]=event.target.value;
        this.setState({product:product})
    }
    
    async handleAdd(event) {
        event.preventDefault()
        await ProductService.addProduct(this.state.product)
        window.location.reload(false)
    }
    
    render() {
        const products=this.state.products;
        return (
            <div>
                <div className="row mb-3">
                    <span className="ml-5">
                        <h4>Products</h4>
                    </span>
                    <span className="float-right ml-auto mr-5 pointer"  data-toggle="collapse" data-target="#add-product">
                        <i className="material-icons">playlist_add</i> Add
                    </span>
                </div>
                <ul className="list-group">
                    <li id="add-product" className="list-group-item list-group-item-action collapse justify-content-between mt-1">
                        <form>
                            <div className="form-group">
                                <h5>Add New Product</h5>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-12 col-md-6 my-2">
                                    <label>Product Name</label>
                                    <input className="form-control" type="text" name="name" onChange={this.handleChange}/>
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Image URL</label>
                                    <input className="form-control" type="text" name="image" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 my-2">
                                    <label>Brand Name</label>
                                    <input className="form-control" type="text" name="brand" onChange={this.handleChange}/>
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Manufacturer</label>
                                    <input className="form-control" type="text" name="manufacturer" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 my-2">
                                    <label>Price</label>
                                    <input className="form-control" type="text" name="price" onChange={this.handleChange}/>
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Category Name</label>
                                    <select className="form-control" name="categoryName" id="categoryName" onChange={this.handleChange}>
                                        {this.state.categories.map((category)=>(
                                            <option key={category.id} value={category.name}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group my-2">
                                <button className="btn btn-success" onClick={this.handleAdd} data-toggle="collapse">Add</button>
                            </div>
                        </form>
                    </li>
                </ul>
                <div id="accordion1">
                    <ul className="list-group">
                        {products.map(product=>(
                            <ManageProduct key={product.id} product={product} categories={this.state.categories}/>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ManageProducts;