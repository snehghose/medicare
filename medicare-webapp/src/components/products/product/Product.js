import React, { Component } from 'react';
import './Product.css';
import CartService from '../../services/CartService';
import AuthService from '../../services/AuthService';
import ProductService from '../../services/ProductService';

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
            CartService.addItemToCart(this.props.product.id)
            ProductService.displayMessage()
        }

    }

    render() {
        const product=this.props.product;
        return (
            <div className="card mx-auto my-3">
                <div className="embed-responsive embed-responsive-4by3">
                    <img className="card-img-top embed-responsive-item" src={product.image} alt={product.name}/>
                </div>
                <div className="card-body">
                    <div className="row height">
                    <div className="col-12 font-size-18 text-muted">{product.name}</div>
                    </div>
                    <div className="row">
                        <small className="col-12 font-size-14 text-muted">{product.manufacturer}</small>
                    </div>
                    <div className="row rowheight">
                        <div className="col-12">
                            <span className="font-size-14 font-weight-500 my-auto">₹{product.discountPrice.toFixed(2)}</span>
                            {product.discount>0 && 
                            <>
                                <span className="font-size-14 text-muted my-auto">
                                    <small>
                                        <s>&nbsp;{'₹'+product.price.toFixed(2)}</s>
                                    </small>
                                </span>
                                <span className="badge badge-success text-success float-right my-auto">
                                    {product.discount.toFixed(1)+'% OFF '}
                                </span>
                            </>}
                            
                        </div>
                    </div>
                    <button className="btn btn-info mt-2" onClick={this.handleAddToCart}>
                        <i className="material-icons">add_shopping_cart</i>
                        Add To Cart</button>
                </div>
            </div>
        )
    }
}
export default Product;