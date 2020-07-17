import React, { Component } from 'react';
import Product from './product/Product';
import ProductService from '../services/ProductService';

class Products extends Component {
    constructor(props) {
        super(props)
        this.state={products:[]}
    }
    async componentDidMount(){
        var path=window.location.pathname
        path=path.substring(path.lastIndexOf('/')+1)
        this.setState({products:await ProductService.getProductsByCategory(path)})
    }
    render() {
        return(
            <div>
                {this.state.products.map((product)=>(
                    <Product key={product.id} product={product} history={this.props.history}/>
                ))}
            </div>
        )
    }
}

export default Products;