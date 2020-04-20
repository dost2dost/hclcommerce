import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';

import {MainActions} from '../ReduxActions/MainActions';


class LogOut extends Component {// call this function on logOut button
    constructor(props){
        super(props)
    }
    componentDidMount(props){
        fetch(this.props.getAppSet.API.userLogout,{
            method: 'DELETE' 
        }); 
        //this.props.logOutUser('', '', '', '', '', ''); //removing data from Redux-Reducer 
       // console.log(this.props)
        
    
    }
    render(){
        
        
        return <Redirect to="/MyAccount"/>   
    }
};
const mapStateToProps = (state) =>{
    return { 

        getAppSet : state.getAppSet

    }
};
const mapDispatchToProps = (dispatch) => {
    return{
        logOutUser: ( email, braintreeToken, tokn, userId, WCTrustedToken, personalizationID ) => {
            dispatch(MainActions(email, braintreeToken, tokn, userId, WCTrustedToken, personalizationID))
        }
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(LogOut); 