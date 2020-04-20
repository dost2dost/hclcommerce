import React, { Component } from 'react';
import './CartPage.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { connect } from "react-redux";
import OrderSummaryPopup from "./OrderSummaryPopup";
class CartPage extends Component{
    constructor(props){
        super(props);
        this.state={
            products: []
        }

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
    componentDidMount(props){
        this.setState({products: this.props.getProductsInCart})
    }

    updateQuantity2 = (event, SKUUniqueID, orderItemId, orderId, quantity, Price) => {
        let updateProduct = {SKUUniqueID:SKUUniqueID, orderItemId:orderItemId, quantity: event.target.value, Price:Price}
        if(event.target.value === NaN){
            this.setState({products: this.props.getProductsInCart})
        }
        else if(event.target.value !== quantity){
        
            this.props.updateCart(orderId, updateProduct)
            this.setState({products: this.props.getProductsInCart})
            console.log(event.target.value+"<><><><"+ quantity)
        } 
    }
    updateQuantity =(event, SKUUniqueID, orderItemId, orderId, quantity, Price) =>{      
        let updateProduct = {SKUUniqueID:SKUUniqueID, orderItemId:orderItemId, quantity: event.target.value, Price:Price}
        if(event.target.value !== quantity){
        const payloads = {
            orderId: orderId,
            orderItem: [
                {"orderItemId": orderItemId,
                "productId": SKUUniqueID, 
                "quantity": "10" 
                }],
            "x_calculateOrder": "0",
            "x_inventoryValidation": "true"
        }
        fetch(this.props.getAppSet.API.addToCartUrl,{
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
             console.log(data)
             console.log(this.props.getWCToken+"<<>>"+this.props.getWCTrustedToken)
             //this.props.addToCart(data.orderId, removeProduct)
             this.props.updateCart(data.orderId, updateProduct)
             this.setState({products: this.props.getProductsInCart})
             console.log(this.state.products)
        },
        (error) => {//API not accessable or through error            
           
            console.log( "Error Data>>"+error);
        });
    }
    }
    render(){
        
        return(
            <div className="shoppingCart">
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
                                <button onClick={this.removeItem.bind(this, 
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
                                <select  defaultValue={'DEFAULT'} onChange={
                                    (event) => {this.updateQuantity(event,
                                        item.SKUUniqueID, 
                                        item.orderItemId, 
                                        this.props.getOrderId,
                                        item.quantity,
                                        item.Price  
                                    )}
                                }>
                                <option value={item.quantity} selected>{item.quantity}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="6">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                </select>
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
                                <a href="#">Move to wishList</a>
                            </td>
                            <td className="edit"> </td>
                            <td className="delete"><Link className="nextBtn" to="/Checkout/">Next</Link></td>
                        </tr>
                        </tbody>
                    </table>
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

        updateCart : (orderId, updateProduct) => {
            dispatch({
                type: 'UPDATE_CART', payloads: {orderId, updateProduct}
            })
        }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartPage); 