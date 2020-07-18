import React, { Component } from 'react';
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
                    <div className="col-5 col-sm-6 col-md-6 col-xl-7 my-auto">
                        <strong className="text-size">{product.name}</strong>
                    </div>
                    <div className="col-3 col-sm-3 col-md-4 my-auto">
                        <div className="text-danger float-right mx-3 pointer p-2" data-toggle="tooltip" data-placement="top" title="Delete" onClick={this.handleDelete}>
                            <i className="material-icons">delete_forever</i>
                        </div>
                        <div className="text-primary float-right mx-3 pointer p-2" data-toggle="tooltip" data-placement="top" title="Edit" data-toggle="collapse" data-target={'#'+product.id}>
                            <i className="material-icons">edit</i>
                        </div>
                    </div>
                </div>
                <div id={product.id} className="collapse justify-content-between mt-1" data-parent="#accordion1">
                    <hr/>
                    <form>
                        <div className="row">
                            <div className="col-12 col-md-6 my-2">
                                <label>Product Name</label>
                                <input className="form-control" type="text" value={product.name} name="name" onChange={this.handleChange}/>
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <label>Image URL</label>
                                <input className="form-control" type="text" value={product.image} name="image" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 my-2">
                                <label>Brand Name</label>
                                <input className="form-control" type="text" value={product.brand} name="brand" onChange={this.handleChange}/>
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <label>Manufacturer</label>
                                <input className="form-control" type="text" value={product.manufacturer} name="manufacturer" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 my-2">
                                <label>Price</label>
                                <input className="form-control" type="text" value={product.price.toFixed(2)} name="price" onChange={this.handleChange}/>
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <label>Category Name</label>
                                <select className="form-control" name="categoryName" id="categoryName" defaultValue={product.categoryName} onChange={this.handleChange}>
                                    {this.state.categories.map((category)=>(
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group my-2">
                            <button className="btn btn-success" onClick={this.handleUpdate}>Update</button>
                        </div>
                    </form>
                </div>
            </li>
        )
    }
}

export default ManageProduct;