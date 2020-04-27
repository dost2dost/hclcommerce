import React from 'react'; 
import './App.css';
import './bootstrap.min.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'; 
import SignIn from './component/SignIn';
import Home from './component/Home';
import NewAccount from './component/NewAccount';
import Contact from './component/Contact';
import Category from './component/Category';
import SubCategory from './component/SubCategory';
import Product from './MyProduct';
import VRex from './component/VREx';
import LeftMenu from './component/LeftMenu';
import VRModel from './component/VRModel';
import CartPage from './component/CartPage';
import Checkout from './Checkout';
import OrderSummary from './component/OrderSummary'
import OrderComplete from "./component/OrderComplete";
import PaymentMethod from './component/PaymentMethod';
import {connect} from 'react-redux';
import logOutUser from './component/LogOut'

import MyAccount from './MyAccount';
import MyAccountPage from './component/MyAccounts/MyAccountPage';
import MyAccountMenu from './component/MyAccounts/MyAccountMenu';

function App(props) {
  console.log(props.user+":usernNme");
  return (
    
    <div className="App">
      <Router>
      <header className="App-header">
       <Header />
      </header>
      <section>
      <div className="MidBody">
          <Switch>
            <Route exact path="/"  component={Home}/>  
            <Route path="/contact" component={Contact}/>  
            <Route path="/signin" component={SignIn}/> 
            {/* <Route path="/logOutUser" component={logOutUser}/>  */}
            <Route path="/NewAccount" component={NewAccount}/> 
            <Route path="/Product" component={Product}/> 
            <Route path="/VRex" component={VRex}/> 
            <Route path="/VRModel" component={VRModel}/> 
            <Route path="/LeftMenu" component={LeftMenu}/>
            <Route path="/Category" component={Category}/>
            <Route path="/SubCategory" component={SubCategory}/> 
            <Route path="/CartPage" component={CartPage}/>
            <Route path="/Checkout" component={Checkout}/>
            <Route path="/PaymentMethod" component={PaymentMethod}/>
            <Route path="/OrderSummary" component={OrderSummary}/>
            <Route path="/OrderComplete" component={OrderComplete} />
            <Route path="/MyAccount" component={MyAccount}/> 
            <Route path="/MyAccountPage" component={MyAccountPage}/> 
            <Route path="/MyAccountMenu" component={MyAccountMenu}/> 
            </Switch>
      </div>
      </section>
      <div className="Footer" id="mainFooter">
        <Footer/>
      </div>
      </Router >
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userName
  }
}
// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }
export default connect(mapStateToProps)(App);
