import React, { Component } from 'react';
import './CartPage.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { connect } from "react-redux"; 
import OrderSummaryPopup from './OrderSummaryPopup'
import { Redirect } from 'react-router-dom'
import NewAccount from './NewAccount';
import Home from './Home';
class OrderComplete extends Component{
    constructor(props){
        super(props);
        this.state={
            products: [],
            userName: '',
            password: '',
            errorMsg: '',
            gotoMyAccount: false,
            isAuthenticated: false,
            headers: { 
                'Content-type': 'application/json',
                'WCToken':  this.props.getWCToken,
                'WCTrustedToken': this.props.getWCTrustedToken
            },
            Token: this.props.getWCToken,
            trustToken: this.props.getWCTrustedToken,
            billAndShip: this.props.getCartDetails.billAndShipAddDetails
        }
    }
 
    componentDidMount(props){
        this.setState({products: this.props.getProductsInCart})
        //this.props.emptyCart()
      }
      
    componentDidUpdate(){
        //this.props.emptyCart()
    }
    componentWillUnmount(){

    }
    gotoMyAccount =() => {
        this.props.orderComplete()
        this.setState({gotoMyAccount: true})
    }
    render(){
        if(this.state.gotoMyAccount){
            return <Redirect to="/"/>
        }
        console.log(this.props.getWCToken+"<<<>>>"+this.props.getWCTrustedToken)
        return(
            <div className="shoppingCart orderComplete">
                <h2>Order Complete</h2> 
                <p>Thank you for Shopping</p> 
                <p>Your Order ID: <b>{this.props.getOrderId}</b></p>
                <div className="clearBoth"></div>
                <div className="items">
                <div className="shippingAdd">
                        <div className="addFields">
                            <p><b>Shipping Address:</b></p>
                            <p>{this.state.billAndShip.lastName}</p>
                            <p>{this.state.billAndShip.firstName}</p>
                            <p>{this.state.billAndShip.country}</p>
                            <p>{this.state.billAndShip.state}</p>
                            <p>{this.state.billAndShip.city}</p>
                            <p>{this.state.billAndShip.addressLine}</p>
                            <p>{this.state.billAndShip.email1}</p>
                        </div>
                        <div className="shippAddOptions">
                            <p><b>Shipping Method:</b></p>
                            <p>{this.props.getCartDetails.shippingMethod}</p>
                        </div>
                    </div>
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
                            
                        {this.state.products.map( (item, index) => (                        
                        <tr className="products" key={index}>
                            <td className="item">
                             
                                <img src={`${this.props.getAppSet.serverBaseURL}${item.thumbnail}`} />
                             
                            </td>
                            <td className="description">
                                <span>{item.longDescription} </span>
                               
                               
                            </td>
                            <td className="price">
                                <span>{item.Price}</span>
                            </td>
                            <td className="qty"> <span>{item.quantity}</span>
                                 
                            </td>
                            <td className="subtotal">
                                <span>{(parseFloat(item.Price)*parseFloat(item.quantity)).toFixed(2)}</span>
                            </td>
                        </tr>
))}
                        <tr className="wishList">
                            <td colSpan="2" className="wishList">
                                {/* <p>
                                    <b>New customer & guests</b><br/>
                                        Checkout without signing in<br/>


                                        You can make your purchases from Aurora without signing in.<br/>


                                        You will be given the option to register during the checkout steps.
                                </p>
                                <Link className="nextBtn" to="/Checkout/">Continue Checkout</Link> */}
                            </td> 
                            <td colSpan="3"  className="delete">
                                <br/><br/>
                            <div className="clearBoth"></div>
                                                               
                                
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="shippingAdd">
                        <div className="addFields">
                            <p><b>Billing Address:</b></p>
                            <p>{this.state.billAndShip.lastName}</p>
                            <p>{this.state.billAndShip.firstName}</p>
                            <p>{this.state.billAndShip.country}</p>
                            <p>{this.state.billAndShip.state}</p>
                            <p>{this.state.billAndShip.city}</p>
                            <p>{this.state.billAndShip.addressLine}</p>
                            <p>{this.state.billAndShip.email1}</p>
                        </div>
                        <div className="shippAddOptions">
                        <p><b>Billing Method:</b></p>
                             <p>{this.props.getCartDetails.billingMethod}</p>
                            <br/>
                            <b>Amount:</b><br/>
                            <input type="text" value={this.props.getCartDetails.grandTotal}/>
                        </div>
                    </div>
                    <table className="orderCompleteContBtn"><tr>
                        <td><button className="nextBtn" onClick={this.gotoMyAccount}>Continue Shopping</button></td>
                        {/* <td><button className="nextBtn" onClick={this.gotoMyAccount}>Continue Shopping</button></td> */}
                        </tr>
                    </table>
                    
                    {/* <Link className="nextBtn" to="/">Print </Link> */}
                    <br/>
                </div>
                <OrderSummaryPopup/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        getResourceName : state.userToken.resourceName,
        getWCToken : state.userToken.WCToken,
        getWCTrustedToken: state.userToken.WCTrustedToken,
        getProductsInCart : state.cart.products,
        //getCartQuantity: state.cart.cart,
        getSubTotal :state.cart.subTotal,
        getOrderId : state.cart.orderId,
        getCartDetails : state.cart,

        getAppSet: state.getAppSet
    }
};
const mapDispatchToProps = (dispatch) =>{
    return{
        orderComplete: () => {
            dispatch({
                type: 'ORDER_COMPLETE', payloads :{}
            })
        },
        emptyCart : () => {
            dispatch({
                type: 'EMPTY_CART', payloads: {}
            })
        }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderComplete); 