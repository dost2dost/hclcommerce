import React, {Component} from 'react';  
import LeftMenu from './component/LeftMenu';
import {Link, Redirect} from 'react-router-dom';
import HeadMenu from './component/HeadMenu';
import {connect} from 'react-redux';
import {logOutUser} from './component/LogOut';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ShoppingCart from './component/ShoppingCart'
import './Header.css';
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {search : "What we can help you find?",  showProductItems : false, cssShowHide: 'none', 
        logOutCall: false, 
        searchItems: [],
        searchStart: false
        };
       }
       getSearch = (event) =>{
           this.setState ({search : event.target.value});
           let searchWord = ''
           if(event.target.value.length > 1){
               searchWord = event.target.value
               let getUrl = `${this.props.getAppSet.API.autoSuggest}${searchWord}?pageSize=4`
               //`https://192.168.17.91:5443/wcs/resources/store/1/categoryview/byParentCategory/5`  
               console.log(getUrl)
               fetch(getUrl) 
               .then(res => res.json(   ))
               .then(json => {
                   this.setState({
                       searchItems: json,
                       searchStart: true
                   })
                   console.log(this.state.searchItems.suggestionView[0].entry[0].term)
               }).catch(e => console.log(e));
            } 
            else{this.setState({searchStart: false, searchItems: []})}
           
       }      
      
       logOutUser = (event) => {// call this function on logOut button
        fetch(this.props.getAppSet.API.userLogout, {
            method: 'DELETE' 
        });
        this.setState({
            isAuthenticated: false,
            Token: '',
            userName: '',
            password: ''
           // errorMsg: data.errors[0].errorMessage
        });
        this.props.loginUser('', '', '', '', '', '', ''); //removing data from Redux-Reducer
        this.setState({startLoading: false});
       // this.props.history.push("/");
        }
        showCart = (event) => {
            if(this.props.getCartQuantity > 0){
            console.log(this.state.showProductItems+"set")
         this.setState({
             showProductItems: true //!this.state.showProductItems
         });
        }
             // console.log(this.hideAtStart);
        }
        hidePopup = (cartItems) => {
            //console.log(this.state.showProductItems+'close pupop is called from header'+cartItems)
            this.setState({showProductItems: false})
            //console.log(this.state.showProductItems+'close pupop is called from header'+cartItems)
        }
    render(){
        let shopCart = '' //'cart here'
        console.log(this.state.showProductItems+'showproduct')
        if(this.state.showProductItems){ 
            shopCart = (<ShoppingCart showPopup={'show'} closePopup={(cartItems) => this.hidePopup(cartItems)}/>);
            //this.setState({showProductItems: false})
            //console.log(shopCart+'shopCart')
        }
        if(this.state.logOutCall){
            return <Redirect to="/logOutUser"/>
        } 
         const {showProductItems} = this.state;
         //console.log(this.props.getTocken+":Token");
         let signBtn, createAccBtn, myAccBtn;
          //console.log(this.props.getResourceName+"-----------------<"+this.props.getTocken );
         if(this.props.getTocken === '' || this.props.getResourceName === "guestidentity"){
           signBtn =  <Link to="/signin">Sign In</Link>; 
           createAccBtn = <Link to="/NewAccount"> Create an Account</Link>;
           myAccBtn = '';
         }
         else {
             myAccBtn = <Link to="/MyAccount"> My Account</Link>;
             signBtn =  <a className="logOutClick" onClick={this.logOutUser}>Log Out</a>; 
         }
         let completSet = signBtn + ' OR';
         console.log(this.props.getCartQuantity)
    return(
        <div className="fullHeaderPart">
        <div className="topHeader">
            <div className="freeShip">
                <p>FREE SHIPPING over $35*</p>
            </div>
            <div className="phNmber">
                <div className="helpHolder">
                    <Link to="/contact" >Help</Link> | 1-877-234-8013 
                </div>
            </div>
            <div className="signIn">
                 {signBtn}  
                 &nbsp; | {createAccBtn} 
                 {myAccBtn}
                
            </div>
        </div>
        <div className="searchBar">
            <div className="logo"> <Link to="/" ><img alt="POD Single Page Application" src={`${this.props.getAppSet.baseURL}Images/logo_2.png`} /></Link></div>
            <div className="searchInput">
                <input type="text" placeholder={this.state.search} onChange={this.getSearch} />
                <a className="searchBtn" href="">Search</a>
            <div className="autoSuggest">{
                this.state.searchStart ? <ul> {this.state.searchItems.suggestionView[0].entry.map(srch => (
                        <li key={srch.frequency}><Link to={`lk`}>{srch.term}</Link></li>
                    ))}</ul>
                    : null
            }</div>
            </div>
            <div className="cartHolder">
        <a className="cardClicker" onClick={this.showCart}>Cart <span className="cartNum">{this.props.getCartQuantity}</span></a>
            {shopCart}
            </div>
            {/* <div className="shipCart" onClick={this.showHideCart}></div> */}
        </div>
        <div className="mainMenu">
           <HeadMenu />
        </div>
        </div>
    )
    }
};
const mapStateToProps = (state) =>{
    return {
        getTocken: state.userToken.WCToken,
        getResourceName: state.userToken.resourceName,
        getCartQuantity: state.cart.cartQuantity,

        getAppSet : state.getAppSet

    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
       loginUser: (email, resourceName, braintreeToken, tokn, userId, WCTrustedToken, personalizationID ) => {
           dispatch({
                   type: 'LOGED_USER', payloads: {email, resourceName, braintreeToken,  tokn, userId, WCTrustedToken, personalizationID}
               })
       }
       // ,
       // changeToken: (token) => {
       //     dispatch({type: 'LOGED_TOKEN', payloads: token})
       // }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);