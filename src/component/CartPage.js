import React, { Component } from 'react';
import './CartPage.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { connect } from "react-redux";
import OrderSummaryPopup from "./OrderSummaryPopup";
class CartPage extends Component{
    constructor(props){
        super(props);
        this.state={
            products: [],
            userName: '',
            password: '',
            errorMsg: '',
            isAuthenticated: false,
            Token: this.props.getWCToken,
            trustToken: this.props.getWCTrustedToken
        }
    }
    formHandler = (event) =>{
        this.setState({ [event.target.name] : event.target.value});
        //console.log(this.props.getToken+"dngle");
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
             this.cartDetails()
        },
        (error) => {//API not accessable or through error            
           
            console.log( "Error Data>>"+error);
        });
    }
    componentDidMount(props){
        this.setState({products: this.props.getProductsInCart})
        console.log('componnent did mount called')
        this.cartDetails()
    }
    cartDetails = () => {
        fetch(this.props.getAppSet.API.cartDetails,{
            method: 'GET',
            headers: { 
                'Content-type': 'application/json',
                'WCToken':  this.props.getWCToken,
                'WCTrustedToken': this.props.getWCTrustedToken
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log('cartDetail api called')
            console.log(json)
            //this.setState({billAndShip: json})
            this.props.updateDisAndTot(json.totalProductPrice, json.grandTotal, json.totalAdjustment)
            this.setState({products: this.props.getProductsInCart})
        }).catch(e => console.log(e));
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
                "quantity": quantity 
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
             this.cartDetails()
             console.log(this.state.products)
        },
        (error) => {//API not accessable or through error            
           
            console.log( "Error Data>>"+error);
        });
    }
    }
    signIn = () => { 
        console.log(this.state.userName + this.state.password)
        const payloads = {
            logonId: this.state.userName, //"zarak786@gmail.com", //zarak786@gmail.com karim.zarak@royalcyber.com
            logonPassword: this.state.password //"Revert!23d"
        } 
        fetch(this.props.getAppSet.API.userLogin,{
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json',
                'WCToken':  this.props.getWCToken,
                'WCTrustedToken': this.props.getWCTrustedToken
            },
            body: JSON.stringify(payloads)
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.errors != undefined){//API results with an error message 
                console.log(data);
                this.setState({
                    isAuthenticated: false,
                    errorMsg: data.errors[0].errorMessage
                });
            }
            else if( data.WCToken !== undefined){ //Successfully Loged In
                console.log(data.WCToken+"------"+data.WCTrustedToken);
                this.setState({
                    isAuthenticated: true,
                    Token: data.WCToken,
                    trustToken: data.WCTrustedToken,
                     errorMsg : ''
                });
                
                //below addin data into Redux-Reducer
                //console.log(data.resourceName+"from sign page")
                this.props.loginUser(this.state.userName, data.resourceName, data.braintreeToken, data.WCToken, data.userId,  data.WCTrustedToken, data.personalizationID);
                this.cartDetails()
                // this.props.changeToken(data.WCToken);
            }
            else{ // API results 
                console.log('Else Statement');
                this.setState({
                    isAuthenticated: false,
                    errorMsg: 'Error while loging'
                });
            }
        },
        (error) => {//API not accessable or through error            
            this.setState({
                isAuthenticated: false,
                errorMsg: 'Either your user name or password is wrong'
            });
            console.log(this.state.isAuthenticated+"Error Data>>"+error);
        }); 
        //this.setState({startLoading: false});
    }
    render(){
        let checkCustomer = ''
        if(this.props.getResourceName === 'loginidentity' || this.props.getResourceName === 'person'){
            checkCustomer = (
               <> <div class="clearBoth"></div>
                <Link className="nextBtn" to="/Checkout/">Checkout</Link>
                <br/><br/>
                </>
            )
        console.log(this.props.getWCToken+"<<<"+this.props.getResourceName+">>>"+this.props.getWCTrustedToken)
        }
        else{
            checkCustomer = (
                <div className="loginCartPage"><br/>
            <p><b>Returning customers</b></p>
        <input type="text" name="userName" placeholder="Username" onChange={this.formHandler}/><br/><br/>
        <input type="password" placeholder="Password" name="password" onChange={this.formHandler}/><br/><br/>
        <button className="nextBtn" onClick={this.signIn}>Sign In & Checkout</button>
             </div> 
        )
        }

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
                            {checkCustomer}
                                {/* {this.props.getResourceName === 'loginidentity' || this.props.getResourceName === 'person'  ?  //guestidentity   person  "loginidentity"
                                <div className="loginCartPage"><br/>
                                        <p><b>Returning customers</b></p>
                                    <input type="text" name="userName" placeholder="Username" onChange={this.formHandler}/><br/><br/>
                                    <input type="password" placeholder="Password" name="password" onChange={this.formHandler}/><br/><br/>
                                    <button className="nextBtn" onClick={this.signIn}>Sign In & Checkout</button>
                                </div>
                                : this.props.getResourceName === 'guestidentity' ? <Link className="nextBtn" to="/Checkout/">Checkout</Link> : null } */}
                                
                                {/* <Link className="nextBtn" to="/Checkout/">Next</Link> */}
                            </td>
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
        },

        updateDisAndTot : (total, grandTotal, discount) => {
            dispatch({
                type: 'CART_DETAILS', payloads: {total, grandTotal, discount}
            })
        },

        loginUser: (email, resourceName,  braintreeToken, tokn, userId, WCTrustedToken, personalizationID ) => {
            dispatch({
                    type: 'LOGED_USER', payloads: {email, resourceName, braintreeToken,  tokn, userId, WCTrustedToken, personalizationID}
                })
        }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartPage); 