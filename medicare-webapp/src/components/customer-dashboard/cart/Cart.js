import React, { Component } from 'react';
import './Cart.css'
import CartItem from './CartItem';
import CartService from '../../services/CartService';
import { Link } from 'react-router-dom';
import NotFound from '../../site/not-found/NotFound';

class Cart extends Component {
    constructor() {
        super()
        this.state={flag:false, amount:0.0}
        this.handleCheckout=this.handleCheckout.bind(this)
    }
    
    componentDidMount(){
        this.setState({flag:false})
    }

    async handleCheckout(event) {
        event.preventDefault();
        this.setState({amount:JSON.parse(sessionStorage.getItem('user')).cart.total})
        await CartService.checkout();
        this.setState({flag:true})
    }

    render() {
        if(JSON.parse(sessionStorage.getItem('user'))===null || JSON.parse(sessionStorage.getItem('user')).role!=='ROLE_CUSTOMER')
        return (<NotFound/>)
        const cart=JSON.parse(sessionStorage.getItem('user')).cart
        let diff=(cart.mrp-cart.total).toFixed(2);
        return (
            <div className="container">
                {cart.items.length===0 && (
                    <div className="justify-content-center">
                        {this.state.flag===true && <div className="alert alert-warning border border-warning text-center my-5"><h5>
                            Order placed!!! Your items will be delivered tomorrow. Please pay ₹{this.state.amount.toFixed(2)} on delivery.</h5>
                        </div>}
                        {this.state.flag===false && <div className="alert alert-warning border border-warning text-center my-5">
                            No items in Cart.
                        </div>}
                        <Link style={{textDecoration:'none'}} to="/">
                            <div className="alert alert-success border border-success text-center">
                                <i className="material-icons">arrow_left</i> Continue Shopping
                            </div>
                        </Link>
                    </div>
                )}
                {cart.items.length>0 && (
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <ul className="list-group mb-5">
                                {cart.items.map((item)=>(
                                    <CartItem key={item.id} item={item}/>
                                ))}
                            </ul>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="card mb-5">
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
                                    {diff>0 && 
                                        <div className="card bg-light-green text-success text-center my-4">
                                            TOTAL SAVINGS ₹{diff}({((diff/cart.mrp)*100).toFixed(0)}%)
                                        </div>
                                    }
                                    <button className="btn btn-info w-100 text-center" onClick={this.handleCheckout}><strong>PLACE ORDER</strong></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Cart;