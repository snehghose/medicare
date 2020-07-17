import React from 'react';

const ManageOffer = (props) => {
    const product=props.product;
    return(
        <li className="list-group-item list-group-item-action" data-toggle="collapse" 
        data-target={"#1"+product.id}>
            <div className="row">
                <div className="col-5 my-auto">{product.name}</div>
                <div className="col-3 my-auto text-center text-success">
                    {product.offer.discount}% off
                </div>
                <div className="col-2">
                    <button className="btn btn-link float-right">
                        <i className="material-icons">edit</i>
                    </button>
                </div>
                <div className="col-2">
                    <button className="btn btn-link text-danger">
                        <i className="material-icons">delete_forever</i>
                    </button>
                </div>
            </div>
            <div id={"1"+product.id} className="collapse row justify-content-between mt-1" data-parent="#accordion">
                <div className="col-6 col-md-4 col-lg-3">
                  <div>
                    <strong>Category Name</strong>
                  </div>
                  <div>{product.name}</div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                  <div>
                    <strong>Image</strong>
                  </div>
                  <div>{product.offer.discount}% off</div>
                </div>
              </div>
                        </li>
        
        
    )
}

export default ManageOffer;