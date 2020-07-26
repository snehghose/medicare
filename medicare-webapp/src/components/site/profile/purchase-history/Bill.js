import React from 'react';
import BillItem from './BillItem';
import './Bill.css';

const Bill=(props)=>{
    const bill=props.bill;
    var date=new Date(bill.billDate[0],bill.billDate[1]-1,bill.billDate[2],bill.billDate[3],bill.billDate[4]);
    var str=date.toLocaleDateString("en",{month:"short",weekday:"short",day:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})
    return (
            
            <div className="row mb-4"> 
                <div className="col-12">
                    <li className="list-group-item list-group-item-action">
                        <div className="row">
                            <div className="col-6 text-secondary">
                                <i className="material-icons">schedule</i>
                            <span className="text-muted ml-1">Placed {str}</span>
                            </div>
                            <div className="col-6 text-success">
                            <strong className="float-right">₹{bill.total.toFixed(2)}</strong>
                            </div>
                        </div>
                        <hr/>
                        <div className="row justify-content-center text-info pointer" data-toggle="collapse" data-target={'#'+bill.id}>
                            <strong>Order Details</strong>
                            <i className="material-icons ml-2">keyboard_arrow_down</i>
                        </div>
                    </li>
                </div>
                <div className="col-12">
                    <div id={bill.id} className="collapse justify-content-between" data-parent="#accordion">
                        <ul className="list-group">
                            {bill.billItems.map((item)=>(
                                <BillItem key={item.product.id} item={item}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

export default Bill;