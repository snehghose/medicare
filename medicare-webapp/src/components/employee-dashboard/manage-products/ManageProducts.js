import React, { Component } from 'react';
import ManageProduct from './ManageProduct';
import CategoryService from '../../services/CategoryService';
import ProductService from '../../services/ProductService';

class ManageProducts extends Component {
    constructor(props) {
        super(props)
        this.state={
            products:[], 
            categories:[], 
            product:{
                name:'', 
                brand:'', 
                manufacturer:'', 
                price:'', 
                image:'', 
                categoryName:''
            },
            errors:{
                name:'',
                image:'',
                brand:'',
                manufacturer:'',
                price:'',
                categoryName:''
            }
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleAdd=this.handleAdd.bind(this)
    }
    
    async componentDidMount() {
        this.setState({ products: await ProductService.getAllProducts(),categories: await CategoryService.getAllCategories()});
    }
    
    handleChange(event) {
        event.preventDefault();
        var product=this.state.product;
        var errors=this.state.errors;
        const {name,value} = event.target;
        product[name]=value;
        switch(name) {
            case 'name':
                errors.name=value.length>3?'':'Name should have atleast 4 characters';
                break;
            case 'image':
                errors.image=value.length>0?'':'Image URL is required';
                break;
            case 'brand':
                errors.brand=value.length>0?'':'Brand is required';
                break;
            case 'manufacturer':
                errors.manufacturer=value.length>0?'':'Manufacturer is required';
                break;
            case 'price':
                errors.price=isNaN(value)?'Invalid price':'';
                break;
            case 'categoryName':
                errors.categoryName=value.length>0?'':'Category Name is required';
                break;
        }
        this.setState({product:product, errors:errors})
    }
    
    async handleAdd(event) {
        event.preventDefault()
        var product=this.state.product
        var errors=this.state.errors
        let flag=0;
        Object.keys(product).forEach(key=>{
            errors[key]=product[key].length>0?'':key.charAt(0).toUpperCase()+key.slice(1)+' is required';
        })
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag++;
        });
        if(flag===0) {
            await ProductService.addProduct(this.state.product)
            window.location.reload(false)
        }
        else
        this.setState({errors:errors})
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
                                    <input className="form-control" type="text" name="name" placeholder="Enter Product Name" onChange={this.handleChange}/>
                                    {this.state.errors.name.length>0 && <small className='text-danger'>{this.state.errors.name}</small>}
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Image URL</label>
                                    <input className="form-control" type="text" name="image" placeholder="Enter Image URL" onChange={this.handleChange}/>
                                    {this.state.errors.image.length>0 && <small className='text-danger'>{this.state.errors.image}</small>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 my-2">
                                    <label>Brand Name</label>
                                    <input className="form-control" type="text" name="brand" placeholder="Enter Brand Name" onChange={this.handleChange}/>
                                    {this.state.errors.brand.length>0 && <small className='text-danger'>{this.state.errors.brand}</small>}
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Manufacturer</label>
                                    <input className="form-control" type="text" name="manufacturer" placeholder="Enter Manufacturer Name" onChange={this.handleChange}/>
                                    {this.state.errors.manufacturer.length>0 && <small className='text-danger'>{this.state.errors.manufacturer}</small>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 my-2">
                                    <label>Price</label>
                                    <input className="form-control" type="text" name="price" placeholder="Enter Price" onChange={this.handleChange}/>
                                    {this.state.errors.price.length>0 && <small className='text-danger'>{this.state.errors.price}</small>}
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Category Name</label>
                                    <select className="form-control" name="categoryName" id="categoryName" onChange={this.handleChange}>
                                        <option className="font-italic" defaultValue="" selected={true} disabled={true}>Choose Category</option>
                                        {this.state.categories.map((category)=>(
                                            <option key={category.id} value={category.name}>{category.name}</option>
                                        ))}
                                    </select>
                                    {this.state.errors.categoryName.length>0 && <small className='text-danger'>{this.state.errors.categoryName}</small>}
                                </div>
                            </div>
                            <div className="form-group my-2">
                                <button className="btn btn-info" onClick={this.handleAdd} data-toggle="collapse">Add</button>
                            </div>
                        </form>
                    </li>
                </ul>
                <div id="accordion1">
                    <ul className="list-group mb-5">
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