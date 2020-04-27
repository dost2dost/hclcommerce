import React, { Component } from 'react';
import './NewAccount.css';
import { connect } from 'react-redux';
import {MainActions} from '../ReduxActions/MainActions';
import { Redirect } from 'react-router-dom';
class NewAccount extends Component{
    constructor(props){
        super(props);
        this.state = {firstName : '', lastName: '',  email: '', newsCheck: '', password : '', confirmPassword: '',
                    streetaddress: '', 
                    city: '',
                    countryRegion: '',
                    stateProvince: '',
                    zipCode: '',
                    address1: '',

        errorMsg: '', isAuthenticated: false};
        //this._handleFirstName = this._handleFirstName.bind(this);
    }
   
    submitForm = (e) => {
        if(this.state.firstName == ''){
            this._handleFirstName.focus();
            return false;
        }
        if(this.state.lastName == ''){
            this._handleLastName.focus();
            return false;
        }
        if(this.state.email == ''){
            this._handleEmail.focus();
            return false;
        }
        if(this.state.password == ''){
            this._handlePassword.focus();
            return false;
        }
        if(this.state.confirmPassword == ''){
            this._handleConfirmPassword.focus();
            return false;
        }
        if(this.state.confirmPassword !== this.state.password){
            alert('Password and Confirm Password not same');
            this._handleConfirmPassword.focus();
            return false;
        }
        this.goForRegistration();
    }
    goForRegistration = () => {
        const payloads = {
            logonPassword: this.state.password, //"zarak786@gmail.com", //zarak786@gmail.com karim.zarak@royalcyber.com
            profileType : 'C',
            logonPasswordVerify: this.state.confirmPassword, //"Revert!23d"
            logonId: this.state.email,
            //streetaddress: this.state.streetaddress, 
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email1: this.state.email,
            addressLine: this.state.streetaddress,
            city: this.state.city,
            country: this.state.countryRegion,
            state: this.state.stateProvince,
            zipCode: this.state.zipCode, 
        }
        fetch(this.props.getAppSet.API.newRegistration,{
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json'
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
                console.log(this.state.errorMsg)
            }
            else if( data.WCToken != undefined){ //Successfully Loged In
                console.log('success');
                console.log(data);
                this.setState({
                    isAuthenticated: true,
                    Token: data.WCToken, 
                    errorMsg : ''
                });
                //below addin data into Redux-Reducer
                this.props.registerUser(
                    this.state.userName, data.resourceName, data.braintreeToken, data.WCToken, data.userId,  data.WCTrustedToken, data.personalizationID
                )
                
                //this.props.loginUser(this.state.userName, data.braintreeToken, data.WCToken, data.userId,  data.WCTrustedToken, data.personalizationID);
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
    }
    handleEachItem = (event) => {
       
        //this.setState ({userName = this.state.});
        //this.setState({ userName : event.target.value});
        //console.log(event.target.value);
      this.setState({ [event.target.name] : event.target.value}); 

      //alert(this.state.email);
    }
    render(){
        if(this.state.isAuthenticated){
            return <Redirect to="/MyAccount"/>
        }
        return(
            <div className="checkoutPage newAccount">
                <h3>Create New Customer Account</h3>
                <div className="clearBoth"></div>
                <div className="items">
                    <div className="lableInput">
                        <div className="lable">
                            <h2 className="newAccountH2">Personal Information</h2>
                        </div>
                        <div className="getInput">
                           
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>First Name </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input name="firstName" ref={(input) => {this._handleFirstName = input;}} onChange={this.handleEachItem} type="text" />
                        </div>
                    </div>
                    
                    <div className="lableInput">
                        <div className="lable">
                            <span>Last Name </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input name="lastName" ref={(input) => {this._handleLastName = input;}} onChange={this.handleEachItem} type="text" />
                        </div>
                    </div>

                    <div className="lableInput">
                        <div className="lable">
                            <span>Street Address </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input name="streetaddress" ref={(input) => {this._handleLastName = input;}} onChange={this.handleEachItem} type="text" />
                        </div>
                    </div>
                    
                    <div className="lableInput">
                        <div className="lable">
                            <span>City </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input name="city" ref={(input) => {this._handleLastName = input;}} onChange={this.handleEachItem} type="text" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Country/Region </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input name="countryRegion" ref={(input) => {this._handleLastName = input;}} onChange={this.handleEachItem} type="text" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>State Province</span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input name="stateProvince" ref={(input) => {this._handleLastName = input;}} onChange={this.handleEachItem} type="text" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Zip Code</span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input name="zipCode" ref={(input) => {this._handleLastName = input;}} onChange={this.handleEachItem} type="text" />
                        </div>
                    </div>
                    
                    <div className="lableInput">
                        <div className="lable">
                            
                        </div>
                        <div className="getInput checkBox">
                            <input className="checkBoxSize"  onChange={this.handleEachItem}  name="newsCheck" type="checkbox" /><span>Sign Up for Newsletter</span>
                        </div>
                    </div>
                    <br/><br/>

                    <div className="lableInput">
                        <div className="lable">
                            <h2 className="newAccountH2">Personal Information</h2>
                        </div>
                        <div className="getInput">
                           
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Email </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input name="email" ref={(input) => {this._handleEmail = input;}} onChange={this.handleEachItem} type="text" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Password </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                             <input  name="password" ref={(input) => {this._handlePassword = input;}} onChange={this.handleEachItem} type="password" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Confirm Password </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                        <input name="confirmPassword" ref={(input) => {this._handleConfirmPassword = input;}} onChange={this.handleEachItem} type="password" />
                        </div>
                    </div>
                    <div>
                        <span className="errorMessage">{this.state.errorMsg}</span>
                    </div><br/><br/>
                    <div className="nextBtn"><a onClick={this.submitForm}>Create an Account </a></div>
                    <br/><br/><br/>
                    
                </div>
                
            </div>
        );
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
const mapDispatchToProps = (dispatch) => {
    return{
        registerUser: ( email, resourceName, braintreeToken, tokn, userId, WCTrustedToken, personalizationID ) => {
            dispatch(MainActions(email, resourceName, braintreeToken, tokn, userId, WCTrustedToken, personalizationID))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewAccount);