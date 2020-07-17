import React, { Component } from 'react';
import CategoryService from '../../services/CategoryService';
import ProductService from '../../services/ProductService';

class ManageProduct extends Component {
    constructor(props) {
        super(props)
        this.state={product:this.props.product,categories:this.props.categories}
        this.handleChange=this.handleChange.bind(this)
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
    }
    
    handleChange(event) {
        event.preventDefault();
        var product=this.state.product;
        product[event.target.name]=event.target.value;
        this.setState({product:product})
    }

    async handleUpdate(event) {
        event.preventDefault();
        await ProductService.updateProduct(this.state.product)
        window.location.reload(false)
    }

    async handleDelete(event) {
        event.preventDefault();
        await ProductService.deleteProduct(this.state.product.id)
        window.location.reload(false)
    }

    render(){
        const product=this.props.product;
        return (
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    <div className="col-4 col-sm-3 col-md-2 col-xl-1 text-center my-auto">
                        <img className="img-fluid pic-size" src={product.image} alt={product.name}/>
                    </div>
                    <div className="col-4 col-sm-5 col-md-5 col-xl-6 ml-1 my-auto">
                        <strong className="text-size">{product.name}</strong>
                    </div>
                    <div className="col-3 col-sm-3 col-md-4 my-auto">
                        <div className="text-danger float-right ml-4 pointer" data-toggle="tooltip" data-placement="top" title="Delete" onClick={this.handleDelete}>
                            <i className="material-icons">delete_forever</i>
                        </div>
                        <div className="text-primary float-right pointer" data-toggle="tooltip" data-placement="top" title="Edit" data-toggle="collapse" data-target={'#'+product.id}>
                            <i className="material-icons">edit</i>
                        </div>
                    </div>
                </div>
                <div id={product.id} className="collapse justify-content-between mt-1" data-parent="#accordion">
                    <hr/>
                    <form>
                        <div className="form-group row">
                            <div className="col-6">
                                <label>Product Name</label>
                                <input className="form-control" type="text" value={product.name} name="name" onChange={this.handleChange}/>
                            </div>
                            <div className="col-6">
                                <label>Image URL</label>
                                <input className="form-control" type="text" value={product.image} name="image" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-6">
                                <label>Brand Name</label>
                                <input className="form-control" type="text" value={product.brand} name="brand" onChange={this.handleChange}/>
                            </div>
                            <div className="col-6">
                                <label>Manufacturer</label>
                                <input className="form-control" type="text" value={product.manufacturer} name="manufacturer" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-6">
                                <label>Price</label>
                                <input className="form-control" type="text" value={product.price} name="price" onChange={this.handleChange}/>
                            </div>
                            <div className="col-6">
                                <label>Category Name</label>
                                <select className="form-control" name="categoryName" defaultValue={product.categoryName} onChange={this.handleChange}>
                                    {this.state.categories.map((category)=>(
                                        <option key={category.id}>{category.name}</option>
                                    ))}
                                </select>
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

export default ManageProduct;