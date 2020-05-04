import React, { Component } from 'react';
import './Checkout.css'; 
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import OrderSummaryPopup from "./component/OrderSummaryPopup";
import OrderComplete from './component/OrderComplete'
class Checkout extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
            billAndShip: [],
            header: 
            {
                'accept': 'application/json',
                'Content-type': 'application/json',
                'WCToken':  this.props.getWCToken,
                'WCTrustedToken': this.props.getWCTrustedToken
            },
            shippingAddDetails: [],
            billingAddDetails: [],
            addressId: '',
            addCountry: '',
            redirectToSummaryPage: false,
            shipDetails: '',
            billDetails:'',
        }
    }
    componentDidMount(props){
        this.setState({products: this.props.getProductsInCart})
        this.billAndShipUserInfo()
        this.shippingMethod()
        this.billingMethod()
    }
    billAndShipUserInfo = () => {      
        fetch(this.props.getAppSet.API.billAndShipUserInfo,{ // 'https://192.168.17.91:5443/wcs/resources/store/1/person/@self',
             method: 'GET',
             headers: this.state.header 
         })
         .then(res => res.json())
         .then(json => {
             console.log(json)
             this.setState({billAndShip: json, addressId:json.addressId, addCountry:json.country})
         }).catch(e => console.log(e));
     }
     shippingMethod = () => {      
        fetch(this.props.getAppSet.API.shippingMethods,{//'https://192.168.17.91:5443/wcs/resources/store/1/cart/@self/usable_shipping_info',
             method: 'GET',
             headers: this.state.header 
         })
         .then(res => res.json())
         .then(json => {
             console.log(json)
             this.setState({shippingAddDetails: json.orderItem[0].usableShippingMode})
             console.log(json.orderItem[0].usableShippingMode)
         }).catch(e => console.log(e));
     }
     billingMethod = () => {      
        fetch(this.props.getAppSet.API.billingMethods,{//'https://192.168.17.91:5443/wcs/resources/store/1/cart/@self/usable_payment_info',
             method: 'GET',
             headers: this.state.header 
         })
         .then(res => res.json())
         .then(json => {
             console.log(json)
             this.setState({billingAddDetails: json.usablePaymentInformation})
             console.log(this.state.billingAddDetails)
         }).catch(e => console.log(e));
     }
     removeItem = (SKUUniqueID, orderItemId, orderId, quantity, Price) => {
        //console.log(`${SKUUniqueID}--- ${orderItemId} ---- ${orderId}`)
        let removeProduct = {SKUUniqueID:SKUUniqueID, orderItemId:orderItemId, quantity: quantity, Price: Price}
        const payloads = {
            orderId: orderId,
            "orderItemId": orderItemId,//"12326",
            "catEntryId": SKUUniqueID //"1"
            //"x_calculateOrder": "0",
            //"x_inventoryValidation": "true", 
        }  
        fetch(this.props.getAppSet.API.deleteFromCart,{
            method: 'PUT',
            headers: {
                //'accept': 'application/json',
                'Content-type': 'application/json',
                'WCToken':  this.props.getWCToken,
                'WCTrustedToken': this.props.getWCTrustedToken

            },
            body: JSON.stringify(payloads)
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
             this.props.removeFromCart(data.orderId, removeProduct)
             this.setState({products: this.props.getProductsInCart})
        },
        (error) => {//API not accessable or through error            
           
            console.log( "Error Data>>"+error);
        });
    }
    handlerShipValue = (event) =>{
        this.setState({ shipDetails : event.target.value});  
        
        console.log(event.target.value)
    }
    handlerBillValue = (event) =>{
        this.setState({ billDetails : event.target.value}); 
        console.log(event.target.value) 
    }
    gotoSummary = () => {//paymentInstructions
        const payloads = {
            "billing_address_id": this.state.addressId,
            "payMethodId": "COD",
            "orderId": this.props.getCartDetails.orderId,
            "piAmount": this.props.getCartDetails.grandTotal,
            "billto_address1":this.state.addressId,
            "billto_country": this.state.addCountry 
            //"x_calculateOrder": "0",
            //"x_inventoryValidation": "true", 
        }  
        fetch(this.props.getAppSet.API.paymentInstructions,{
            method: 'POST',
            headers: {
                //'accept': 'application/json',
                'Content-type': 'application/json',
                'WCToken':  this.props.getWCToken,
                'WCTrustedToken': this.props.getWCTrustedToken

            },
            body: JSON.stringify(payloads)
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(this.state.shipDetails+'---'+this.state.billDetails)
            this.props.otherDetails(this.state.billAndShip, this.state.shipDetails, this.state.billDetails, this.state.addressId, this.state.addCountry, data.paymentInstruction[0].piId, data.orderId)
            
            //this.props.removeFromCart(data.orderId, removeProduct)
             this.setState({redirectToSummaryPage: true})
        },
        (error) => {//API not accessable or through error            
           
            console.log( "Error Data>>"+error);
        });
        
        console.log(`${this.props.getCartDetails.addressId}--${this.props.getCartDetails.orderId}--${this.props.getCartDetails.piId}--${this.props.getCartDetails.addCountry}--${this.props.getCartDetails.shippingMethod}---${this.props.getCartDetails.billingMethod}`)
        
    }
    render(){
        //console.log(`${this.state.addressId}--${this.props.getCartDetails.orderId}--${this.props.getCartDetails.grandTotal}--${this.state.addCountry}`)
        if(this.state.redirectToSummaryPage){
           return <Redirect to="/OrderSummary"/>
        }
        return(
            
            <div className="shoppingCart">
                <h2>Shipping & Billing Method</h2>
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
                            <select name = "shipDetails" onChange={this.handlerShipValue}>
                                {this.state.shippingAddDetails.map(item => (
                                <option value={item.description} key={item.shipModeId}>{item.description}</option>    
                                ))}
                            </select>
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
                            <Link to={`/Product/?${item.uniqueID}`}>
                                <img src={`${this.props.getAppSet.serverBaseURL}${item.thumbnail}`} />
                            </Link>
                            </td>
                            <td className="description">
                                <Link to={`/Product/?${item.uniqueID}`}>  {item.longDescription}</Link>
                                <br/>
                                <button className="nextBtn sizing" onClick={this.removeItem.bind(this, 
                                    item.SKUUniqueID, 
                                    item.orderItemId, 
                                    this.props.getOrderId,
                                    item.quantity,
                                    item.Price
                                    )}>Remove Item</button>                                 
                            </td>
                            <td className="price">
                                <span>{item.Price}</span>
                            </td>
                            <td className="qty">
                            {item.quantity}
                                {/* <input type="text" value={item.quantity} onChange={
                                    (event) => {this.updateQuantity(event,
                                        item.SKUUniqueID, 
                                        item.orderItemId, 
                                        this.props.getOrderId,
                                        item.quantity,
                                        item.Price  
                                    )}
                                }/> */}
                            </td>
                            <td className="subtotal">
                                <span>{(parseFloat(item.Price)*parseFloat(item.quantity)).toFixed(2)}</span>
                            </td>
                        </tr>
))}
                        <tr className="wishList">
                            <td colSpan="3" className="wishList">
                                {/* <a href="#">Move to wishList</a> */}
                            </td>
                            <td className="edit"> </td>
                            <td className="delete">
                                
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
                            <select name = "shipDetails" onChange={this.handlerBillValue}>
                                {this.state.billingAddDetails.map(item => (
                                <option value={item.description} key={item.xumet_policyId}>{item.description}</option>    
                                ))}
                            </select>
                            <br/>
                            <b>Amount:</b><br/>
                            <input type="text" value={this.props.getCartDetails.grandTotal}/>
                        </div>
                    </div>
                    <br/>
                        {/* <Link className="nextBtn" to="/Checkout/">Next</Link> <br/> */}
                        <button className="nextBtn sizing pageBtn" onClick={this.gotoSummary}>Next</button>
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
        getCartDetails: state.cart,
        getSubTotal :state.cart.subTotal,

        getAppSet: state.getAppSet
    }
};
const mapDispatchToProps = (dispatch) =>{
    return{
        removeFromCart: (orderId, removeProduct) => {
            dispatch({
                type: 'REMOVE_FROM_CART', payloads :{ orderId, removeProduct}
            })
        },
        otherDetails: (billAndShipAddDetails, shippingAddDetails, billingAddDetails, addressId, addCountry, piId, orderId) => {
            dispatch({
                type: 'OTHER_CART_DETAILS', payloads: {billAndShipAddDetails, shippingAddDetails, billingAddDetails, addressId, addCountry, piId, orderId}
            })
        }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);