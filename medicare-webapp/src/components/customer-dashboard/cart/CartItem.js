import React, { Component } from 'react';
import './Cart.css'
import CartService from '../../services/CartService';

class CartItem extends Component{
    constructor(props) {
        super(props);
        this.state={product:{},quantity:''}
        this.componentDidMount=this.componentDidMount.bind(this);
        this.handleAddQuantity=this.handleAddQuantity.bind(this)
        this.handleSubtractQuantity=this.handleSubtractQuantity.bind(this)
        this.handleDeleteItem=this.handleDeleteItem.bind(this)
    }
    componentDidMount(){
        this.setState({product:this.props.item.product, quantity:this.props.item.quantity})
    }
    async handleAddQuantity(event) {
        event.preventDefault();
        this.setState({quantity:this.state.quantity+1})
        await CartService.addItemToCart(this.props.item.id)
        window.location.reload(false)
    }
    async handleSubtractQuantity(event) {
        event.preventDefault();
        this.setState({quantity:this.state.quantity-1})
        if(this.state.quantity>0)
        await CartService.removeItemFromCart(this.props.item.id)
        else
        await CartService.deleteItemFromCart(this.props.item.id)
        window.location.reload(false)
    }

    async handleDeleteItem(event) {
        event.preventDefault();
        await CartService.deleteItemFromCart(this.props.item.id)
        window.location.reload(false)
    }

    render(){
        var quantity=CartService.getQuantity(this.props.item.id)
        console.log(quantity);
        const product=this.props.item.product;
        
        return (
            <li className="list-group-item">
                <div className="row">
                    <div className="col-3">
                        <img className="pic-size" src={product.image} alt={product.name}/>
                    </div>
                    <div className="col-9">
                        <div className="row">
                        <div className="col-8">{product.name}</div>
                        <div className="col-4">
                            <span className="float-right" onClick={this.handleDeleteItem}><i className="material-icons text-danger">delete_forever</i></span>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {product.manufacturer}
                            </div>
                        </div>

                        <div className="row">
                        <div className="col-12 col-sm-5">
                            <i className="material-icons text-success pointer" onClick={this.handleSubtractQuantity}>indeterminate_check_box</i>
                            <span className="mx-4">{this.state.quantity}</span>
                            <i className="material-icons text-success pointer" onClick={this.handleAddQuantity}>add_box</i>
                        </div>
                        <div className="col-8 col-sm-3">
                            <span>x</span>
                            <span className="mx-1">₹{product.discountPrice.toFixed(2)}</span>
                            {product.discountPrice!==product.price &&
                            <span><small><s className="text-muted">₹{product.price.toFixed(2)}</s></small></span>}
                        </div>
                    <div className="col-12 col-sm-4">
                        <span className="float-right font-weight-bold text-secondary">₹{(product.discountPrice * this.state.quantity).toFixed(2)}</span>
                    </div>
                        </div>
                        
                        
                    </div>
                    
                        

                </div>
                        
                    </li>
        )
    }
}

export default CartItem;