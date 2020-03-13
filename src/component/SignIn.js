import React, { Component } from 'react';
import './SignIn.css'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {userName : '', password: '', isAuthenticated: false, Token: '', errorMsg: '', startLoading: false};
    }
    getChangeHandler = (event) =>{
        this.setState({userName: event.target.value});
    } 
    myHandler = (event) =>{
        this.setState({ [event.target.name] : event.target.value});
        console.log(this.props.getToken+"dngle");
    }
    /* logOutUser = (event) => {// call this function on logOut button
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
    } */
     
    loginUser = (event) =>{ //call this function on login button 
        this.setState({startLoading: true});
        if(this.state.userName == ''){
            console.log('Username is empty');
            alert('Type User Name');
            return false;
        }
        else if(this.state.password == ''){
            alert('Type password');
            return false;
        }
        //event.preventDefault;
        const payloads = {
            logonId: this.state.userName, //"zarak786@gmail.com", //zarak786@gmail.com karim.zarak@royalcyber.com
            logonPassword: this.state.password //"Revert!23d"
        }
        fetch('https://192.168.7.167/wcs/resources/store/11901/loginidentity?responseFormat=json',{
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
            }
            else if( data.WCToken != undefined){ //Successfully Loged In
                console.log(data);
                this.setState({
                    isAuthenticated: true,
                    Token: data.WCToken,
                    userName: payloads.logonId,
                    errorMsg : ''
                });
                //below addin data into Redux-Reducer
                this.props.loginUser(this.state.userName, data.braintreeToken, data.WCToken, data.userId,  data.WCTrustedToken, data.personalizationID);
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
        this.setState({startLoading: false});
    }
    
    render(){
        console.log(this.props.getToken);
        let loading;
        if(this.state.startLoading){
            loading = <div className="loader"><img   src="Images/loader.svg" width="100" height="100"/></div>;
        }
        if(  !this.props.getToken ){//If the user is failed to login or it comes to this page to login
            
        return(
            <div className="signInPage">
                {/* {loading}  */}
                <br/> 
                <h1>Customer Login </h1>
                <br/> 
               <div className="costomerRegistration">
                    <h2>Registered Customers</h2>
                    <br/>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Email  </span><span className="starik">*</span>
                        </div>
                        <div className="getInput"><input type="text" id="yName" name="userName" onChange={this.myHandler} /></div>
                    </div>
                    <br/><br/><br/>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Password </span><span className="starik">*</span>
                        </div>
                        <div className="getInput"><input type="password" name="password" id="yEmail" onChange={this.myHandler} /></div>
                    </div>
                    <br/><br/><br/>
                   
                    <div className="nextBtn"><a onClick={this.loginUser} >Sign In</a></div>
                    <br/><br/>   
                    <p className="errorMessage">
                        {this.state.errorMsg}
                    </p>
                    <br/><br/><br/>
               </div>
               <div className="newCostomer">
               <h2>New Customers</h2>
               <br/>
                    <div><p className="signInPara">Creating an account has many benefits: check out faster, keep more than one address, track orders and more.</p> </div> 
                    <br/> 
                    <div className="nextBtn">
                        <Link to="/NewAccount" className="nextBtn">Create an Account</Link></div>
               </div>
               <br/><br/><br/>
            </div>
        )
        }
        else{ //After successfull login
            //{this.setState.formSubmit= false;}
            
                return <Redirect to="/MyAccount"/>
             
            
        }
    }
};
const mapStateToProps = (state) => {
    return {
      getToken: state.WCToken
    }
  }
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
//export const logOut = SignIn.logOutUser;
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
