import React from 'react';
import { Link } from 'react-router-dom';
import './Category.css'

function Category(props){
    const category=props.category;
    const goto = {
        pathname:"/products/"+category.name,
        products:category.productList
    }
    return (
        <Link className="card mb-5" style={{textDecoration:'none'}} to={goto}>
            {category.maxDiscount>0 && 
                <div className="pic">
                    <div className="text-light p-1 ml-2">
                        <strong>
                            UPTO {category.maxDiscount}% OFF
                        </strong>
                    </div>
                </div>}
            <div className="card-body">
                <img className="card-img-top" src={category.image} alt={category.name}/>
                <div className="height p-2 text-center blockquote">
                    <strong>
                        {category.name}
                    </strong>
                </div>
            </div>
        </Link>
    )
}

export default Category;