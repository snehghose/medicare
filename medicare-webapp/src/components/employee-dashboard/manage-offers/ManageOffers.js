import React, { Component } from 'react';
import ManageOffer from './manage-offer/ManageOffer';
import ProductService from '../../services/ProductService';
import '../Employee.css'

class ManageOffers extends Component {
    constructor(props) {
        super(props)
        this.state={
            discountedProducts:[], 
            nonDiscountedProducts:[], 
            product:{},
            discountError:''
        }
        this.handleSelect=this.handleSelect.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleAdd=this.handleAdd.bind(this)
    }
    
    async componentDidMount() {
        this.setState({discountedProducts:await ProductService.getDiscountedProducts(), 
            nonDiscountedProducts:await ProductService.getNonDiscountedProducts()})
    }

    handleSelect(event) {
        event.preventDefault()
        this.state.nonDiscountedProducts.forEach(product => {
            if(product.name===event.target.value)
            this.setState({product:product})
        });
    }

    handleChange(event) {
        event.preventDefault()
        var product=this.state.product;
        var discountError=this.state.discountError;
        product.discount=event.target.value;
        if(isNaN(product.discount)||product.discount<0)
        discountError='Invalid value'
        if(product.discount.length<0)
        discountError='Discount is required'
        product.discountPrice=(100-product.discount)*product.price/100;
        this.setState({product:product, discountError:discountError})
    }

    async handleAdd(event) {
        event.preventDefault()
        var discountError=this.state.discountError
        let flag=0;
        discountError=this.state.product.discount.length>0?discountError:'Discount is required';
        if(discountError.length>0)
            flag++;
        if(flag===0) {
            await ProductService.updateProduct(this.state.product)
            window.location.reload(false)
        }
        else
        this.setState({discountError:discountError})
    }

    render(){
        return (
            <div>
                <div className="row mb-3">
                    <span className="ml-5">
                        <h4>Offers</h4>
                    </span>
                    <span className="float-right ml-auto mr-5 pointer" data-toggle="collapse" data-target="#add-offer">
                        <i className="material-icons">playlist_add</i> Add
                    </span>
                </div>
                <ul className="list-group">
                    <li id="add-offer" className="list-group-item list-group-item-action collapse justify-content-between mt-1">
                        <form>
                            <div className="form-group">
                                <h5>Add New Offer</h5>
                            </div>
                            <hr/>
                            <div className="form-group row">
                                <div className="col-12">
                                    <select className="form-control" onChange={this.handleSelect}>
                                        <option className="font-italic" value="" selected={true} disabled={true}>Choose Product</option>
                                        <hr className="text-secondary"/>
                                        {this.state.nonDiscountedProducts.map((product)=>(
                                            <option key={product.id} value={product.name}>{product.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 my-2">
                                    <label>Discount</label>
                                    <div className="input-group">
                                        <input className="form-control" type="text" placeholder="Enter Discount Percentage" name="discount" onChange={this.handleChange}/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">% off</div>
                                        </div>
                                    </div>
                                    {this.state.discountError.length>0 && <small className="text-danger">{this.state.discountError}</small>}
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Discounted Price</label>
                                    <input className="form-control" type="text" disabled={true} value={this.state.product.discountPrice?this.state.product.discountPrice.toFixed(2):0} name="discountPrice"/>
                                </div>
                            </div>
                            <div className="form-group my-2">
                                <button className="btn btn-info" onClick={this.handleAdd}  data-toggle="collapse">Add</button>
                            </div>
                        </form>
                    </li>
                </ul>
            <div id="accordion2">
                <ul className="list-group">
                    {this.state.discountedProducts.map((product)=>(
                        <ManageOffer key={product.name} product={product}/>
                    ))}
                </ul>
            </div>
        </div>
    )
    }
}

export default ManageOffers;