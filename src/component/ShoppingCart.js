import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
class ShoppingCart extends Component{
    constructor(props){
        super(props)
        this.state={
            showProductItems: false
        }
    }
    showCart = (event) => {
        this.setState({showProductItems: true})
        console.log(this.state.showProductItems)
    }
    hideCart = (event) => {
        this.setState({showProductItems: false})
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps != this.props){
            console.log('componente did got changed')
            this.showCart()
        }
    }
    componentDidMount(props){
        console.log('props'+this.props.showPopup)
        if(this.props.showPopup !== undefined  || this.props.callAPI != undefined){
                this.showCart()
                this.fetchAPI()
         }
    }
    checkWCToken = (props) => {
        if(this.props.WCToken != ''){

        }
    }
    fetchAPI = () => {
        const payloads = {
            orderId: ".",  
            orderItem:  [
                {
                    "productId": "10039",
                    "quantity": "1"
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
            if(data.errors != undefined){//API results with an error message 
                console.log(data);
               
            }
            else if( data.WCToken != undefined){ //Successfully Loged In
                console.log('if else');  console.log(data);
                 
                //below addin data into Redux-Reducer
               // this.props.loginUser(this.state.userName, data.braintreeToken, data.WCToken, data.userId,  data.WCTrustedToken, data.personalizationID);
                // this.props.changeToken(data.WCToken);
            }
            else{ // API results 
                console.log('Else Statement');
               
            }
        },
        (error) => {//API not accessable or through error            
           
            console.log( "Error Data>>"+error);
        }); 
         
    } 
    render(){
        console.log(this.props.getWCTrustedToken+'render')
                return(
            <>
                {this.state.showProductItems === true ? <div   id="cartDetailPage" name="cartDetailPage">
                    <div className="closeBtn"  onClick={this.hideCart}>
                        x
                    </div>
                    <div className="cartDetail">
                        <div className="cartItems">
                            <span>1 <span className="itemInCart"></span> in Cart</span>
                        </div>
                        <div className="cartTotal">
                            <span>Cart Subtotal: <span className="cartSubTotal"></span>1</span>
                        </div>
                        <div className="clearBoth"></div>
                    </div>
                    <div className="checkoutAndPaypal">
                        <div className="proceed">
                        <Link to="/Checkout">Proceed to Checkout</Link>
                        </div>
                        <div className="paypal">
                            <a href="#">PayPal</a>
                        </div>
                    </div>
                    <div className="eachProduct" >
                        <div className="thumbnail"><img src="/Images/1.jpg" /> </div>
                        <div className="otherInfo">
                            <div className="clickText"><p>
                                        ASUS VivoBook F512DA 15.6" Ultraslim Laptop - AMD Ryzen 5 3500U, 8GB RAM, 512GB SSD, Windows 10, McAfee 1-Year
                                </p></div>
                            <div className="price">$250.00</div>
                            <div className="qtyEditDelete">
                                <div className="qty">
                                    <span>Qty:</span>
                                    <input type="text" placeholder="1"/>
                                </div>
                                <div className="edit"><a href="#">Edit </a></div>
                                <div className="delete"><a href="#"> Delete</a></div>
                                <div className="clearBoth"></div>
                            </div>
                        </div>
                        <div className="clearBoth"></div>
                    </div>
                    <div className="viewAndEdit"><Link to="/CartPage">View and Edit Cart</Link></div>
                </div> : ''}
                
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        getResourceName : state.resourceName,
        getWCToken : state.WCToken,
        getWCTrustedToken: state.WCTrustedToken
    }
};
export default connect(mapStateToProps)(ShoppingCart)