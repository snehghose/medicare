import React, { Component } from 'react';
import './Product.css';
import CartService from '../../services/CartService';
import AuthService from '../../services/AuthService';

class Product extends Component{
    constructor(props) {
        super(props)
        this.state={flag:false, productId:''}
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
            this.setState({flag:await CartService.addItemToCart(this.props.product.id), productId:this.props.product.id})
            setTimeout(()=>this.setState({flag:false,productId:''}), 2000);
        }

    }

    render() {
        const product=this.props.product;
        return (
            <div className="card mx-auto my-3">
                {this.state.flag===true && this.state.productId===product.id && <div className="alert alert-success text-center m-3">Added to Cart</div>}
                <div className="embed-responsive embed-responsive-4by3">
                    <img className="card-img-top embed-responsive-item" src={product.image} alt={product.name}/>
                </div>
                <div className="card-body">
                    <div className="row height">
                    <div className="col-12 font-size-18 text-muted text-overflow">{product.name}</div>
                    </div>
                    <div className="row">
                        <small className="col-12 font-size-14 text-muted text-truncate">{product.manufacturer}</small>
                    </div>
                    <div className="row my-2">
                        <div className="col-12">
                            <span className="text-danger font-size">₹{product.discountPrice.toFixed(2)}</span>
                            {product.discount>0 && 
                            <>
                                <span className="text-muted my-auto">
                                    <small>
                                        &nbsp;<s>{'₹'+product.price.toFixed(2)}</s>
                                    </small>
                                </span>
                                <span className="badge badge-success text-success float-right my-auto">
                                    {(product.discount.toFixed(1)%1===0.0?product.discount.toFixed(0):product.discount.toFixed(1))+'% OFF '}
                                </span>
                            </>}
                            
                        </div>
                    </div>
                    <button className="btn btn-info mt-2 w-100" onClick={this.handleAddToCart}>
                        <i className="material-icons">add_shopping_cart</i>  <strong>ADD TO CART</strong>
                    </button>
                </div>
            </div>
        )
    }
}
export default Product;