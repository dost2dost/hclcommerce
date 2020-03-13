import React, { Component } from 'react';
import './PaymentMethod.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
class PaymentMethod extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="checkoutPage paymentMethod">
                <h3>Payment Method</h3>
                <div className="clearBoth"></div>
                <div className="items">
                <div className="creditPayment">
                    <span><input type="radio" id="credit" name="payOption" /></span><span><label for="credit">Credit Card</label></span>
                </div>
                <div className="clearBoth"></div>
                
                <br/><hr />
                <div className="clearBoth"></div>
                <div className="paypalPayment">
                    <span><input type="radio" id="paypal" name="payOption"/></span><span><label for="paypal">Paypal</label></span>
                </div>
                <div className="clearBoth"></div>
                <br/><br/>
                <div className="paymentBtn">
                    <a href="#">Continue to Pay</a>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </div>


                <div className="summary">
                    <div><p>Order Summary</p></div>
                    
                    <div className="image">
                        <img src="/Images/7.jpg" />
                    </div>
                     <div className="otherData">
                         <div>
                         <Link to="/Product/?13601">officia delectus consequatur vero aut veniam explicabo molestias</Link>
                         </div>
                         <div className="inputsPrice"> 
                            <span>Qty: 1</span>
                         </div>
                         <div>$29.23</div>
                     </div>
                </div>
            </div>
        )
    }
}
export default PaymentMethod;