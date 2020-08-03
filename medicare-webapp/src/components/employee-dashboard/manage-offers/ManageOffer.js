import React, { Component } from 'react';
import '../Employee.css'
import ProductService from '../../services/ProductService';

class ManageOffer extends Component {
    constructor(props) {
        super(props)
        this.state={
            product:this.props.product,
            discountError:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
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

    async handleUpdate(event) {
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

    async handleDelete(event) {
        event.preventDefault()
        var product=this.state.product
        product.discount=0;
        product.discountPrice=product.price;
        await ProductService.updateProduct(product)
        window.location.reload(false)
    }

    render() {
        const product=this.state.product;
        return(
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    <div className="col-5 my-auto text-size"><strong>{product.name}</strong></div>
                    <div className="col-4 my-auto text-center">
                        <span className="badge badge-success text-success">{product.discount}% OFF</span>
                    </div>
                    <div className="col-3 my-auto p-1 text-center">
                        <div className="pointer text-danger mx-3 p-2 float-right pointer" data-toggle="tooltip" title="Delete" onClick={this.handleDelete}>
                            <i className="material-icons">delete_forever</i>
                        </div>
                        <div className="text-primary pointer mx-3 p-2 float-right pointer" data-toggle="tooltip" title="Edit" data-toggle="collapse" data-target={"#offer"+product.id}>
                            <i className="material-icons">edit</i>
                        </div>
                    </div>
                </div>
                <div id={"offer"+product.id} className="collapse justify-content-between mt-1" data-parent="#accordion2">
                    <hr/>
                    <form>
                        <div className="form-group row">
                            <div className="col-12 col-md-6 my-2">
                                <label>Discount</label>
                                <div className="input-group">
                                    <input className="form-control" type="text" defaultValue={product.discount} name="discount" onChange={this.handleChange}/>
                                    <div className="input-group-append">
                                        <div className="input-group-text">% off</div>
                                    </div>
                                </div>
                                {this.state.discountError.length>0 && <small className="text-danger">{this.state.discountError}</small>}
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <label>Discounted Price</label>
                                <input className="form-control" type="text" disabled={true} value={this.state.product.discountPrice.toFixed(2)} name="discountPrice"/>
                            </div>
                        </div>
                        <div className="form-group my-2">
                            <button className="btn btn-info" onClick={this.handleUpdate}  data-toggle="collapse">Update</button>
                        </div>
                    </form>
                </div>
            </li>  
        )
    }
}

export default ManageOffer;