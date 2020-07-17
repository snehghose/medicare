import React, { Component } from 'react';
import ManageOffer from './manage-offer/ManageOffer';

class ManageOffers extends Component {
    state={products:[],isLoading:true}
    async componentDidMount(){
        const response=await fetch("http://localhost:8082/product");
        const body=await response.json();
        this.setState({products:body,isLoading:false})
    }
    render(){
        const products=this.state.products;
        const productList=[];
    return (
        <div>
            <div className="row mb-3">
                <span className="ml-5">
                    <h4>Offers</h4>
                </span>
                <span className="float-right ml-auto mr-5">
                    <i className="material-icons">playlist_add</i>
                </span>
            </div>
            <div id="accordion">
                <ul className="list-group">
                    {products.map((product)=>(
                        (product.offer==null || product.offer.discount===0)?
                        productList.push(product):<ManageOffer key={product.name} product={product}/>
                    ))}
                </ul>
            </div>
            {/* <div id="accordion">
                <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                        <span><strong>Product Name</strong></span>
                        <span className="btn btn-link text-danger float-right">
                            <i className="material-icons">delete_forever</i>
                        </span>
                        <span className="btn btn-link text-primary float-right">
                            <i className="material-icons">edit</i>
                        </span>
                        <span className="btn btn-link text-dark float-right">
                            <i className="material-icons">keyboard_arrow_down</i>
                        </span>
                    </li>
                </ul>
            </div> */}
        </div>
    )
    }
}

export default ManageOffers;