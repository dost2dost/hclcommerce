import React, {Component} from 'react';  
import LeftMenu from './component/LeftMenu';
import {Link, Redirect} from 'react-router-dom';
import HeadMenu from './component/HeadMenu';
import {connect} from 'react-redux';
import {logOutUser} from './component/LogOut';
import './Header.css';
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {search : "Search entire store here...",  showProductItems : false, cssShowHide: 'none', logOutCall: false};
       }
       getSearch = (event) =>{
           this.setState ({search : event.target.value});
       }
       showHideCart = (event) => { 
        this.setState({
            showProductItems: !this.state.showProductItems
        });
            console.log(this.hideAtStart);
       }
      
       logOutUser = (event) => {// call this function on logOut button
        fetch('https://192.168.7.167/wcs/resources/store/11901/loginidentity/@self',{
            method: 'DELETE' 
        });
        this.setState({
            isAuthenticated: false,
            Token: '',
            userName: '',
            password: ''
           // errorMsg: data.errors[0].errorMessage
        });
        this.props.loginUser('', '', '', '', '', ''); //removing data from Redux-Reducer
        this.setState({startLoading: false});
       // this.props.history.push("/");
        }
    render(){
        if(this.state.logOutCall){
            return <Redirect to="/logOutUser"/>
        } 
         const {showProductItems} = this.state;
         console.log(this.props.getTocken+":Token");
         let signBtn, createAccBtn, myAccBtn;
         console.log(this.props.getTocken);
         if(this.props.getTocken === ''){
           signBtn =  <Link to="/signin">Sign In</Link>; 
           createAccBtn = <Link to="/NewAccount"> Create an Account</Link>;
           myAccBtn = '';
         }
         else {
             myAccBtn = <Link to="/MyAccount"> My Account</Link>;
             signBtn =  <a class="logOutClick" onClick={this.logOutUser}>Log Out</a>; 
         }
         let completSet = signBtn + ' OR';
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
            <div className="logo"> <Link to="/" ><img alt="Circuit City" src="http://localhost:3000/Images/logo_2.png" /></Link></div>
            <div className="searchInput">
                <input type="text" placeholder={this.state.search} onChange={this.getSearch} />
                <a href="">Search</a>
            </div>
            <div className="cartHolder">
                <a className="cardClicker" onClick={this.showHideCart}>Cart <span className="cartNum">1</span></a>
                {showProductItems === true ? <div   id="cartDetailPage" name="cartDetailPage">
                    <div className="closeBtn"  onClick={this.showHideCart}>
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
                
            </div>
            <div className="shipCart"></div>
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
        getTocken: state.WCToken
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
       loginUser: (email, braintreeToken, tokn, userId, WCTrustedToken, personalizationID ) => {
           dispatch({
                   type: 'LOGED_USER', payloads: {email, braintreeToken,  tokn, userId, WCTrustedToken, personalizationID}
               })
       }
       // ,
       // changeToken: (token) => {
       //     dispatch({type: 'LOGED_TOKEN', payloads: token})
       // }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);