import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MyAccountMenu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="myAccountLinks">
                <Link className="active" to="/MyAccount">My Account</Link>
                <Link to="#">My Orders</Link>
                <Link to="#">My Downloadable Products</Link>
                <Link to="#">My Wish List</Link>
                <hr/>
                <Link to="#">Address Book</Link>
                <Link to="#">Account Information</Link>
                <Link to="#">Stored Payment Methods</Link>
                <Link to="#">Billing Agreements</Link>
                <hr/>
                <Link to="#">My Product Reviews</Link>
                <Link to="#">Newsletter Subscriptions</Link>
            </div>
        )
    }
}
export default MyAccountMenu;