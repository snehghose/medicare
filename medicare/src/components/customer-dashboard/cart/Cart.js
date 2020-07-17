import React, { Component } from 'react';
import './Cart.css'
import CartItem from './CartItem';
import CartService from '../../services/CartService';
import { Link } from 'react-router-dom';

class Cart extends Component {

    async handleCheckout(event) {
        event.preventDefault();
        await CartService.checkout();
        window.location.reload(false);
    }

    render() {
        const cart=JSON.parse(sessionStorage.getItem('user')).cart
        let diff=(cart.mrp-cart.total).toFixed(2);
        return (
            <div className="container">
                {cart.items.length===0 && (
                    <div className="justify-content-center">
                        <div className="alert alert-warning text-center">
                            No items in Cart.
                        </div>
                        <div className="btn btn-success text-center"><Link to="/">
                            Continue Shopping</Link>
                        </div>
                    </div>
                )}
                {cart.items.length>0 && (<div className="row">
                <div className="col-12 col-md-8">
                <ul className="list-group">
                    {cart.items.map((item)=>(
                        <CartItem key={item.id} item={item}/>
                    ))}
                </ul>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <span className="text-muted"><small>PAYMENT DETAILS</small></span>
                            <div className="mt-4">
                                <span>M.R.P.</span>
                                <span className="float-right">₹ {cart.mrp.toFixed(2)}</span>
                            </div>
                            <div>
                                <span>Discount</span>
                                <span className="float-right">- ₹ {diff}</span>
                            </div>
                            <hr/>
                            <div>
                                <span>Total Amount</span>
                                <span className="float-right">₹ {cart.total.toFixed(2)}</span>
                            </div>
                            <hr/>
                            <div className="card bg-light-green text-success text-center my-4">TOTAL SAVINGS ₹{diff}({((diff/cart.mrp)*100).toFixed(0)}%)</div>
                            <button className="btn btn-success float-right" onClick={this.handleCheckout}>PLACE ORDER</button>
                        </div>
                    </div>
                    
                </div>
                </div>)}
            </div>
        )
    }
}

export default Cart;