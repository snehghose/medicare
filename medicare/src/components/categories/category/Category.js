import React from 'react';
import { Link } from 'react-router-dom';

function Category(props){
    const category=props.category;
    const goto = {
        pathname:"/products/"+category.name,
        products:category.productList
    }
    return (
        <Link className="card my-2" to={goto}>
            <div className="card-body">
            <div className="row">
            <div className="col-12 col-sm-6">
                <img src={category.image} alt={category.name}/>
            </div>
            <div className="col-12 col-sm-6">
                <div className="mt-1">{category.name}</div>
                <div>{category.maxDiscount}</div>
            </div>
        </div>
            </div>
        </Link>
    
    )
}

export default Category;