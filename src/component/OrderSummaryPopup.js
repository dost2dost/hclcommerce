import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class OrderSummaryPopup extends Component{
    render(){
        return(
            <div className="summary">
                    <div><p>Summary</p></div>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td>SubTotal </td>
                                <td>${this.props.getCartDetails.totalValue}</td>
                            </tr>
                            <tr>
                                <td>Discount </td>
                                <td>${this.props.getCartDetails.discount}</td>
                            </tr>
                            <tr>
                                <td>Tax </td>
                                <td>$0.0</td>
                            </tr>
                            <tr>
                                <td>Order Total </td>
                                <td>${this.props.getCartDetails.grandTotal}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                     {/*<div className="checkoutAndPaypal"><div className="proceed">
                        <Link to="/CartPage/">Proceed to Checkout</Link>
                          
                         </div><div className="paypal">
                             <a href="#">PayPal</a> 
                    </div>
                    </div>*/}
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
        getCartDetails :state.cart,
        getOrderId : state.cart.orderId,

        getAppSet: state.getAppSet
    }
};
export default connect(mapStateToProps, null)(OrderSummaryPopup)