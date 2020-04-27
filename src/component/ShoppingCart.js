import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import ShoppingCartItemDetails from './ShoppingCartItemDetails'
class ShoppingCart extends Component{
    constructor(props){
        super(props)
        this.state={
            showProductItems: false,
            guestUserToken: '',
            itemInCart : '0'
        }
    }
    itemInCart = '0'

    _isMount = false;
    showCart = (event) => {
       // this.setState({showProductItems: true})
        //console.log(this.state.showProductItems+"show popup")
        //this._isMount = false
    }
    hideCart = (event) => {
        //this.setState({showProductItems: false})
       // console.log(this.state.showProductItems+"close popup")
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps != this.props){
            console.log('componente did got changed')
            this.showCart()
        }
    }
    componentDidMount(props){   
        this._isMount = true
        if (this._isMount) {
            //this.setState({showProductItems: true});
           
       // console.log(this.props.callAPI+'props'+this.props.showPopup)
        
        if(this.props.showPopup !== undefined  || this.props.callAPI != undefined){
                this.showCart()
                if(this.props.callAPI != undefined){
                    //console.log(this.props.callAPI.skuId +"<API called"+this.props.callAPI.numQty)
                    if(this.props.getWCToken){
                        //this.fetchAPI(this.props.callAPI.skuId, this.props.callAPI.numQty)  
                    }
                    else{
                        //this.loginGuestAPI();
                    }
                }
         }
        }  
         console.log('compnentdid mount')
    } 
    componentWillUnmount(){
        this._isMount = false;
        console.log('unMount'+this.state.showProductItems)
    } 
    fetchAPI = (itemId, qty) => {
       // console.log(itemId+"<<<id"+qty)
        const payloads = {
            orderId: ".",  
            orderItem:  [
                {
                    "productId": itemId,//"12326",
                    "quantity": qty //"1"
                }
            ],
            "x_calculateOrder": "0",
            "x_inventoryValidation": "true", 
        } //https://192.168.17.91/wcs/resources/store/1/categoryview/byParentCategory/5
        fetch('https://192.168.17.91:5443/wcs/resources/store/1/cart?responseFormat=json',{
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
             console.log(data.orderId)
        },
        (error) => {//API not accessable or through error            
           
            console.log( "Error Data>>"+error);
        }); 
        //this.itemInCart += qty;
        //this.getCartDetails();
    }
    getCartDetails = () => {
        console.log(this.props.getWCToken+"<<<>>>"+this.props.getWCTrustedToken)
        fetch('https://192.168.17.91:5443/wcs/resources/store/1/cart/@self', {
            //method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'WCToken':  this.props.getWCToken,
                'WCTrustedToken': this.props.getWCTrustedToken
            }
        })
        .then(rs=>rs.json())
        .then((rslt)=>{
            this.itemInCart  = rslt;
            console.log(this.itemInCart.recordSetTotal)
            
        },
            (error)=>{console.log('Server Error')
        });
    }
    loginGuestAPI = () => {
        if (this._isMount) {
        fetch('https://192.168.17.91:5443/wcs/resources/store/1/guestidentity',{
            method: 'POST',
            headers: {
                //'accept': 'application/json',
                'Content-type': 'application/json' 
            } 
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log("----------------------login "+this.props.getWCTrustedToken+"---------------------------")
            this.setState({guestUserToken: data.WCToken})
            console.log(data)
            
            if(data.WCToken != undefined){
                this.props.loginGuestUser('Guest', data.resourceName, data.braintreeToken, data.WCToken, data.userId,  data.WCTrustedToken, data.personalizationID);
            }
        },
        (error) => {//API not accessable or through error            
           
            console.log( "Error Data>>"+error);
        }); 
         
        }
        this.fetchAPI(this.props.callAPI.skuId, this.props.callAPI.numQty)  
    }
    render(){
       // console.log(this.rslt+'render') 
        //    if(this.state.showProductItems)
        //    {
            return (
                <div   id="cartDetailPage" className="cartDetailPage" 
                onClick={this.props.closePopup !== undefined ? this.props.closePopup.bind(this, this.itemInCart.recordSetTotal) : null}>
                     {/* <ShoppingCartItemDetails /> */}
                    <div className="closeBtn"  >
                        x
                    </div>
                    <div className="cartDetail">
                        <div className="cartItems">
                            <span>{this.props.getCartQuantity}<span className="itemInCart"></span> in Cart</span>
                        </div>
                        <div className="cartTotal">
            <span>Cart Subtotal: <span className="cartSubTotal"></span>${this.props.getSubTotal}</span>
                        </div>
                        <div className="clearBoth"></div>
                    </div>
                    <div className="checkoutAndPaypal">
                        {/* <div className="proceed">
                        <Link to="/CartPage">Proceed to Checkout</Link>
                        </div> */}
                        <div className="paypal">
                            {/* <a href="#">PayPal</a> */}
                        </div>
                    </div>

                    {this.props.getProductsInCart.map( (item, index) => (   
                    <Link to = {`/Product/?${item.uniqueID}`} key={index}>
                    <div className="eachProduct"  >
                        <div className="thumbnail"><img src={`${this.props.getAppSet.serverBaseURL}${item.thumbnail}`} /> </div>
                        <div className="otherInfo">
                            <div className="clickText"><p>
                                        {item.longDescription}
                                </p></div>
                            <div className="price">${parseFloat(item.Price)*parseFloat(item.quantity)}</div>
                            <div className="qtyEditDelete">
                                <div className="qty">
                                    <span>Qty:</span>
                                    <span>{item.quantity}</span>
                                    {/* <input type="text" placeholder="1" value={item.quantity}/> */}
                                </div>
                                {/* <div className="edit"><a href="#">Edit </a></div>
                                <div className="delete"><a href="#"> Delete</a></div> */}
                                <div className="clearBoth"></div>
                            </div>
                        </div>
                        <div className="clearBoth"></div>
                    </div> 
                    </Link>
                    ))}

                    <div className="viewAndEdit paypal"><Link to="/CartPage">Go to Cart</Link></div>
                </div>
            );
           
        // } 
        //    else{
        //     return(<div>No show</div>);
        //    }
           
    }
}
const mapStateToProps = (state) => {
    return {
        getResourceName : state.userToken.resourceName,
        getWCToken : state.userToken.WCToken,
        getWCTrustedToken: state.userToken.WCTrustedToken,
        getProductsInCart : state.cart.products,
        getCartQuantity: state.cart.cartQuantity,
        getSubTotal :state.cart.subTotal,

        getAppSet: state.getAppSet
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
       loginGuestUser: (email, resourceName,  braintreeToken, tokn, userId, WCTrustedToken, personalizationID ) => {
           dispatch({
                   type: 'LOGED_USER', payloads: {email, resourceName, braintreeToken,  tokn, userId, WCTrustedToken, personalizationID}
               })
       }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)