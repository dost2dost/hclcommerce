import React, { Component } from 'react';
import './CartPage.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
class CartPage extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                <h2>Shopping Cart</h2>
                <div className="clearBoth"></div>
                <div className="items">
                    <table>
                        <thead>
                        <tr className="headings">
                            <td className="item">Item</td>
                            <td className="description"></td>
                            <td className="price">Price</td>
                            <td className="qty">Qty</td>
                            <td className="subtotal">SubTotal</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="products">
                            <td className="item">
                                <img src="/Images/7.jpg" />
                            </td>
                            <td className="description">
                            <Link to="/Product/?13601">officia delectus consequatur vero aut veniam explicabo molestias</Link>
                          
                            </td>
                            <td className="price">
                                <span>$29.99</span>
                            </td>
                            <td className="qty">
                                <input type="text" placeholder="1"/>
                            </td>
                            <td className="subtotal">
                                <span>$29.99</span>
                            </td>
                        </tr>
                        <tr className="wishList">
                            <td colSpan="3" className="wishList">
                                <a href="#">Move to wishList</a>
                            </td>
                            <td className="edit">Edit</td>
                            <td className="delete">Delete</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="summary">
                    <div><p>Summary</p></div>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td>SubTotal </td>
                                <td>$628.28</td>
                            </tr>
                            <tr>
                                <td>Tax </td>
                                <td>$0.28</td>
                            </tr>
                            <tr>
                                <td>Order Total </td>
                                <td>$628.28</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="checkoutAndPaypal"><div className="proceed">
                        <Link to="/Checkout/">Proceed to Checkout</Link>
                          
                         </div><div className="paypal"><a href="#">PayPal</a>
                    </div></div>
                </div>
            </div>
        )
    }
}
export default CartPage;