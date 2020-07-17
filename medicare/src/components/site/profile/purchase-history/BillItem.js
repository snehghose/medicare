import React from 'react';

const BillItem=(props)=>{
    return(<li className="list-group-item">
    <div className="row">
        <div className="col-2">
            <img className="pic-size" src={props.item.product.image} alt={props.item.product.name}/>
        </div>
        <div className="col-10">
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <div className="col-12 col-sm-9">
                            <div>{props.item.product.name}</div>
                            <div className="text-muted">
                                <small>{props.item.product.manufacturer}</small>
                            </div>
                        </div>
                        <div className="col-8 col-sm-3">
                            <span>{props.item.quantity}</span>
                            <span className="mx-1">x</span>
                            <span>₹{props.item.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <span className="float-right">₹{(props.item.price * props.item.quantity).toFixed(2)}</span>
                </div>
            </div>
        </div>
    </div>
</li>

    )
}

export default BillItem;