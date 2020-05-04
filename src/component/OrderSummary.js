import React, { Component } from 'react';
import './CartPage.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { connect } from "react-redux"; 
import OrderSummaryPopup from './OrderSummaryPopup'
import OrderComplete from './OrderComplete';
class OrderSummary extends Component{
    constructor(props){
        super(props);
        this.state={
            products: [],
            userName: '',
            password: '',
            errorMsg: '',
            moveToCompletePage: false,
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
        
    }
    orderComplete = () => {
        this.cartDetails() 
        this.orderAPI()
    }
    cartDetails = () => {
        fetch(this.props.getAppSet.API.cartDetails,{
            method: 'GET',
            headers: this.state.headers
        })
        .then(res => res.json())
        .then(json => {
            console.log('Cart Details')
            console.log(json)
            //this.setState({billAndShip: json})
             this.preCheckout()
        }).catch(e => console.log(e));

         //checkout gives error and 4.5 but at my value 5.5
         //call checkout 4.5
    }
    lockOrder = () => {
        let lockAPI = this.props.getAppSet.API.orderLock+this.props.getOrderId+'/lock'
        console.log(this.props.getOrderId+lockAPI)
        const payloads = {
            orderId: this.props.getOrderId, 
        } 
        fetch(lockAPI,{
            method: 'POST',
            headers: this.state.headers,
            body: JSON.stringify(payloads)
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            this.preCheckout()
        },
        (error) => {//API not accessable or through error            
            console.log( "Error Data>>"+error);
        });
    }
    preCheckout = () => {
        const payloads = {
            orderId: this.props.getOrderId, 
        }  
        fetch(this.props.getAppSet.API.preCheckout,{
            method: 'PUT',
            headers: this.state.headers,
            body: JSON.stringify(payloads)
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            this.checkout()
        },
        (error) => {//API not accessable or through error            
            console.log( "Error Data>>"+error);
        });
    }
    orderAPI = () => { //cart/@self/assigned_promotion_code
        fetch(this.props.getAppSet.API.orderApi+this.props.getOrderId,{
            method: 'GET',
            headers: this.state.headers
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log('Order API')
            console.log(data)
        },
        (error) => {//API not accessable or through error            
            console.log( "Error Data>>"+error);
        });
    }
    checkout = () => {
        const payloads = {
            orderId: this.props.getOrderId, 
        }  
        fetch(this.props.getAppSet.API.checkout,{
            method: 'POST',
            headers: this.state.headers,
            body: JSON.stringify(payloads)
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            this.setState({moveToCompletePage: true})
            this.props.orderComplete()
        },
        (error) => {//API not accessable or through error            
            console.log( "Error Data>>"+error);
        });
    }
    render(){
        //console.log(this.props.getWCToken+"<<<>>>"+this.props.getWCTrustedToken)
        if(this.state.moveToCompletePage){
            return <OrderComplete />
        }
        return(
            <div className="shoppingCart">
                <h2>Order Summary</h2>
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
                            <span>{this.props.getCartDetails.grandTotal}</span>
                            
                        </div>
                    </div>
                    <br/>
                    <button className="nextBtn sizing pageBtn" onClick={this.orderComplete}>Order</button>
                    <br/><br/>
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
        } 
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary); 