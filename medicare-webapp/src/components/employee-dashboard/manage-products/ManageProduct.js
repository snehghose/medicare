import React, { Component } from 'react';
import ProductService from '../../services/ProductService';

class ManageProduct extends Component {
    constructor(props) {
        super(props)
        this.state={
            product:this.props.product,
            categories:this.props.categories,
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
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
    }
    
    handleChange(event) {
        event.preventDefault();
        var product=this.state.product;
        var errors=this.state.errors;
        const {name,value} = event.target;
        product[name]=value;
        switch(name) {
            case 'name':
                errors.name=value.length>3?'':'Name should have atleast 3 characters';
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
                errors.price=isNaN(value)||value<=0?'Invalid price':'';
                break;
            case 'categoryName':
                errors.categoryName=value.length>0?'':'Category Name is required';
                break;
        }
        this.setState({product:product, errors:errors})
    }

    async handleUpdate(event) {
        event.preventDefault();
        var product=this.state.product
        var errors=this.state.errors
        let flag=0;
        Object.keys(errors).forEach(key=>{
            if(key==='price')
            errors.price=product.price>0?'':'Price is required'
            else
            errors[key]=product[key].length>0?'':key.charAt(0).toUpperCase()+key.slice(1)+' is required';
        })
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag++;
        });
        if(flag===0) {
            await ProductService.updateProduct(this.state.product)
            window.location.reload(false)
        }
        else
        this.setState({errors:errors})
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
                                {this.state.errors.name.length>0 && <small className="text-danger">{this.state.errors.name}</small>}
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <label>Image URL</label>
                                <input className="form-control" type="text" value={product.image} name="image" onChange={this.handleChange}/>
                                {this.state.errors.image.length>0 && <small className="text-danger">{this.state.errors.image}</small>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 my-2">
                                <label>Brand Name</label>
                                <input className="form-control" type="text" value={product.brand} name="brand" onChange={this.handleChange}/>
                                {this.state.errors.brand.length>0 && <small className="text-danger">{this.state.errors.brand}</small>}
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <label>Manufacturer</label>
                                <input className="form-control" type="text" value={product.manufacturer} name="manufacturer" onChange={this.handleChange}/>
                                {this.state.errors.manufacturer.length>0 && <small className="text-danger">{this.state.errors.manufacturer}</small>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 my-2">
                                <label>Price</label>
                                <input className="form-control" type="text" value={product.price} name="price" onChange={this.handleChange}/>
                                {this.state.errors.price.length>0 && <small className="text-danger">{this.state.errors.price}</small>}
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <label>Category Name</label>
                                <select className="form-control" name="categoryName" id="categoryName" defaultValue={product.categoryName} onChange={this.handleChange}>
                                    {this.state.categories.map((category)=>(
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                                {this.state.errors.categoryName.length>0 && <small className="text-danger">{this.state.errors.categoryName}</small>}
                            </div>
                        </div>
                        <div className="form-group my-2">
                            <button className="btn btn-info" onClick={this.handleUpdate}>Update</button>
                        </div>
                    </form>
                </div>
            </li>
        )
    }
}

export default ManageProduct;