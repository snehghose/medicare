import React, { Component } from 'react';
import Bill from './Bill';
import NotFound from '../../not-found/NotFound';

class PurchaseHistory extends Component {
    render() {
        if(JSON.parse(sessionStorage.getItem('user'))===null || JSON.parse(sessionStorage.getItem('user')).role!=='ROLE_CUSTOMER')
            return (<NotFound/>)
        const bills=JSON.parse(sessionStorage.getItem('user')).bills;
        return (
            <div className="container">
                <div className="row mb-3">
                    <span className="ml-3">
                        <h4>My Orders</h4>
                    </span>
                </div>
                {bills.length===0 && <div className="alert alert-success">
                    No purchases yet. Continue Shopping.
                </div>}
                {bills.length>0 && <div id="accordion">
                    <ul className="list-group">
                        {bills.map(bill=>(
                            <Bill key={bill.id} bill={bill}/>
                        ))}
                    </ul>
                </div>}
            </div>
        )
    }
}

export default PurchaseHistory;