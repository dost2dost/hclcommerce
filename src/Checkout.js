import React, { Component } from 'react';
import './Checkout.css'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
class Checkout extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="checkoutPage shippPage">
                <h3>Shipping Address</h3>
                <div className="clearBoth"></div>
                <div className="items">
                    <div className="lableInput">
                        <div className="lable">
                            <span>First Name </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Last Name </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input type="text" />
                        </div>
                    </div>
                    
                    <div className="lableInput">
                        <div className="lable">
                            <span>Company </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Street Address </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>City </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>State/Province </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <select>
                                <option>Please Select a region, state or province.</option>
                                <option data-title="Alabama" value="1">Alabama</option>
                                <option data-title="Alaska" value="2">Alaska</option>
                                <option data-title="American Samoa" value="3">American Samoa</option>
                                <option data-title="Arizona" value="4">Arizona</option>
                                <option data-title="Arkansas" value="5">Arkansas</option>
                                <option data-title="Armed Forces Africa" value="6">Armed Forces Africa</option>
                                <option data-title="Armed Forces Americas" value="7">Armed Forces Americas</option>
                            </select>
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Zip/Postal Code </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input type="text" />
                        </div>
                    </div>
                    
                    <div className="lableInput">
                        <div className="lable">
                            <span>Country </span><span className="starik">*</span>
                        </div>
                        <div className="getInput"> 
                            <select>
                                <option>United States.</option> 
                                <option data-title="Afghanistan" value="AF">Afghanistan</option><option data-title="Åland Islands" value="AX">Åland Islands</option><option data-title="Albania" value="AL">Albania</option><option data-title="Algeria" value="DZ">Algeria</option><option data-title="American Samoa" value="AS">American Samoa</option><option data-title="Andorra" value="AD">Andorra</option><option data-title="Angola" value="AO">Angola</option><option data-title="Anguilla" value="AI">Anguilla</option><option data-title="Antarctica" value="AQ">Antarctica</option><option data-title="Antigua &amp; Barbuda" value="AG">Antigua &amp; Barbuda</option><option data-title="Argentina" value="AR">Argentina</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="lableInput">
                        <div className="lable">
                            <span>Phone Number </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="lableInput lableShip">
                        <div className="">
                            <p>Shipping Methods</p> 
                        </div>
                        <div className="getInput">
                            <table className="shippingMethod">
                                <tbody>
                                <tr>
                                    <td><input className="shipRadioBtn" type="radio" />$0.00</td>
                                    <td>Free</td>
                                    <td>Free Shipping</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="nextBtn">
                            <Link to='/PaymentMethod'>Next </Link> 
                        </div>
                        <br/><br/>
                    </div>
                </div>
                <div className="summary">
                    <div><p>Order Summary</p></div>
                    
                    <div className="image">
                        <img src="/Images/7.jpg" />
                    </div>
                     <div className="otherData">
                         <div>
                            <Link to="/Product/?15602">officia delectus consequatur vero aut veniam explicabo molestias</Link>
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
export default Checkout;