import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import './product.css';
import VRex from './component/VREx';
import ProdSkeleton from './Skeleton/ProductSkeleton'
import ShoppingCart from './component/ShoppingCart'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 
import {connect } from 'react-redux'
class MyProduct extends Component{
    constructor(props){
        super(props);
        this.state ={
            quntity: '1',
            items: [],
            isLoaded: false,
            classCall : 'addProductToCartNone',
            forwaredVals :  '',
            orderId: '',
            successOrder: false
        }
    }
    getSearch = (event) =>{
        this.setState ({quntity : event.target.value});
    }
    componentDidMount(props){
        console.log(this.props.getResourceName)
        this.setState ({
            isLoaded: false,
        })
         const { handle } = this.props.location.search;
        
        fetch(this.props.getAppSet.API.productViewById+this.props.location.search.substring(1.1))
        .then( res => res.json())
        .then( json => {
            this.setState ({
                isLoaded: true,
                items: json,
            })
        }).catch(e => console.log(e));

        if(!this.props.getWCToken){
            console.log(this.props.getWCToken)
            this.loginGuestAPI();  
        } 
    } 
    AddToCart = (uniqueID, SKUUniqueID, Price, thumbnail, longDescription) => {
        this.addToCartAPI(uniqueID, SKUUniqueID, Price, thumbnail, longDescription)
    }
    
    closePopup =() =>{
        this.setState({successOrder: false, classCall : 'addProductToCart'})
     }
    addToCartAPI = (uniqueID, SKUUniqueID, Price, thumbnail, longDescription) => {
        let pushCart = {uniqueID:uniqueID, SKUUniqueID:SKUUniqueID, quantity: this.state.quntity, Price:Price, thumbnail:thumbnail, longDescription:longDescription, orderItemId: ''}
        const payloads = {
            orderId: this.state.orderId ? this.state.orderId : ".",  
            orderItem:  [
                {
                    "productId": SKUUniqueID,//"12326",
                    "quantity": this.state.quntity //"1"
                }
            ],
            "x_calculateOrder": "0",
            "x_inventoryValidation": "true", 
        } //https://192.168.17.91/wcs/resources/store/1/categoryview/byParentCategory/5
        fetch(this.props.getAppSet.API.addToCartUrl,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'WCToken':  this.props.getWCToken,
                'WCTrustedToken': this.props.getWCTrustedToken

            },
            body: JSON.stringify(payloads)
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data.orderId)
            console.log(this.props.getWCToken+"<<<>>>"+this.props.getWCTrustedToken)
             if(data.orderId){
                 pushCart.orderItemId = data.orderItem[0].orderItemId
                this.props.addToCart(pushCart, data.orderId);
                console.log(data) 
                this.setState({orderId: data.orderId, successOrder: true, classCall : 'addProductToCart'})
            }
        },
        (error) => {//API not accessable or through error            
           
            console.log( "Error Data>>"+error);
        });
    }
    loginGuestAPI = () => { 
        fetch(this.props.getAppSet.API.guestLogin, {
            method: 'POST',
            headers: { 
                'Content-type': 'application/json' 
            } 
        })
        .then(res=>res.json())
        .then((data)=>{
             //this.setState({guestUserToken: data.WCToken}) 
            if(data.WCToken != undefined){
                this.props.loginGuestUser('Guest', data.resourceName, data.braintreeToken, data.WCToken, data.userId,  data.WCTrustedToken, data.personalizationID);
            }
        },
        (error) => {//API not accessable or through error            
            console.log( "Error Data>>"+error);
        }); 
          
    }
    showClass = 'addProductToCartNone'
    showPopup =() =>{
        this.showClass ="addProductToCart"
    }
    render(){
        var { isLoaded, items } =this.state;
        let popup = '';
        popup = (null)
        if(this.state.successOrder){
            popup = (
                <div className="addProductToCart" onClick={this.closePopup.bind(this, null)}>
                    <p className="addSuccess">Item Successfully Added</p>
                   { [items].map(item => (  
                        item.CatalogEntryView.map(item => (  
                    <div className="eachProduct"  key={item.uniqueID}>
                        <div className="thumbnail"><img src={`${this.props.getAppSet.serverBaseURL}${item.thumbnail}`}/></div>
                        <div className="otherInfo">
                            <div className="clickText"><p> 
                            {item.shortDescription===undefined ? ' ' : item.shortDescription}
                                </p></div>
                            <div className="price"> {item.Price === undefined ? '' : `$${item.Price[0].priceValue}`}</div>
                            <div className="qtyEditDelete">
                                <div className="qty">
                                    <span>Qty:</span>
                                    <span> {item.quantity} </span>
                                    {/* <input type="text" placeholder="1" value={item.quantity}/> */}
                                </div>
                                {/* <div className="edit"><a href="#">Edit </a></div>
                                <div className="delete"><a href="#"> Delete</a></div> */}
                                <div className="clearBoth"></div>
                            </div>
                        </div>
                        <div className="clearBoth"></div>
                    </div> 
                        ))
                    ))}
                    </div>
            )
        }
        
        return(
            <div className="productPage"> 
                {!this.state.isLoaded ? <ProdSkeleton /> : 
                [items].map((item, index) => (
                    <div  key={item.recordSetTotal}>
                        {item.CatalogEntryView.map(insideItems => (
                            <div className="product" key={insideItems.uniqueID}>
                                
                                    {popup} 
                                <div className="imagePortion">
                                    
                                    <div className="mainImage"><img src={`${this.props.getAppSet.serverBaseURL}${insideItems.thumbnail}`}/></div>
                                    {/* <div className="subImages"><img src={`${item.thumbnailUrl}`}/><img src={`${item.thumbnailUrl}`}/><img src={`${item.thumbnailUrl}`}/><img src={`${item.thumbnailUrl}`}/></div> */}
                                    </div>
                                <div className="txtDescription">
                                    <div className="vrAr">
                                    <Link  className="vrLink" to={`/VRModel/?${this.props.location.search.substring(1.1)}`} >VR Model</Link> 
                                    <Link  className="arLink" to={`/VRex`} >AR Access</Link>
                                </div>
                                <div className="description">
                                    {insideItems.longDescription===undefined ? ' ' : insideItems.longDescription}
                                </div>
                                    <div className="priceDetail"> 
                                        <div className="price">  
                                            {insideItems.Price === undefined ? '' : `$${insideItems.Price[0].priceValue}`}
                                        </div>
                                        {/* <div className="sku"><b>SKU#:</b> KAL-JK44499SS</div> */}
                                    </div>
                                    <div className="quanty">
                                        <div className="qtyTxt">Qty</div>
                                        <div className="qtyIn"><input type="text"  value={this.state.quntity} onChange={this.getSearch}/></div>
                                    </div>
                                    <div className="add2Cart"> 
                                        <div className="add2CartDiv"><input onClick={
                                                this.AddToCart.bind(this, 
                                                insideItems.uniqueID,    
                                                insideItems.SKUs[0].SKUUniqueID === undefined ? insideItems.uniqueID : insideItems.SKUs[0].SKUUniqueID,
                                                insideItems.Price === undefined ? '' : insideItems.Price[0].priceValue,
                                                insideItems.thumbnail,
                                                insideItems.shortDescription===undefined ? ' ' : insideItems.shortDescription
                                                 )} type="button" value="Add to Cart"/></div>
                                    </div>
                                </div>
                            </div>
                        ))} 
                        
                    </div>
                ))}
            </div>
        )
        }
    //}
};
const mapStatToProps = (state) => {
    return {
        getResourceName : state.userToken.resourceName,
        getWCToken : state.userToken.WCToken,
        getWCTrustedToken: state.userToken.WCTrustedToken,
        getCart : state.cart.products,

        getAppSet : state.getAppSet
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
       loginGuestUser: (email, resourceName,  braintreeToken, tokn, userId, WCTrustedToken, personalizationID ) => {
           dispatch({
                   type: 'LOGED_USER', payloads: {email, resourceName, braintreeToken,  tokn, userId, WCTrustedToken, personalizationID}
               })
            },

        addToCart: (productDetails, orderId) => {
            dispatch({
                type: 'ADD_CART', payloads :{productDetails, orderId}
            })
        }
   }
}
export default connect(mapStatToProps, mapDispatchToProps)(MyProduct)