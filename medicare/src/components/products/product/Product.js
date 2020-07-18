import React, { Component } from 'react';
import './Product.css';
import CartItem from '../../customer-dashboard/cart/CartItem';
import CartService from '../../services/CartService';
import AuthService from '../../services/AuthService';

class Product extends Component{
    constructor(props) {
        super(props)
        this.handleAddToCart=this.handleAddToCart.bind(this);
    }

    async handleAddToCart(event) {
        event.preventDefault();
        const loggedInUser=JSON.parse(sessionStorage.getItem('user'));
        const currentAuth=JSON.parse(sessionStorage.getItem('auth'));
        if(currentAuth==null||loggedInUser==null){
            AuthService.logout();
            this.props.history.push('/login')
        }
        else {
            console.log(loggedInUser)
            CartService.addItemToCart(this.props.product.id)
            .catch(error=>{
                console.log(error)
                this.props.history.push('/login')
            });
        }

    }


    render() {
        const product=this.props.product;
        var value=(100-product.discount)*product.price/100;
        value=value.toFixed(2);
        return (
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3'>
        <div className="card mx-auto my-3">
            <img className="card-img-top" src={product.image} alt="none"/>
            <div className="card-body">
                <div className="font-size-18 text-muted">{product.name}</div>
                <div className="row">
                    <div className="col-12 font-size-14 text-muted">{product.manufacturer}</div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <span className="font-size-14 font-weight-500">₹{value}</span>
                        <span className="font-size-14 text-muted"><small><s>&nbsp;₹{product.price}</s></small></span>
                        <span className="badge badge-success text-success float-right"> {product.discount}% OFF </span>
                    </div>
                </div>
                <button className="btn btn-info mt-2" onClick={this.handleAddToCart}>
                    <i className="material-icons">add_shopping_cart</i>
                    Add To Cart</button>
            </div>
        </div>
    </div>
        )
    }
}
    


export default Product;