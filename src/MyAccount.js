import React, {Component} from 'react';
import { connect } from 'react-redux' 

import  MyAccountMenu from './component/MyAccounts/MyAccountMenu';
import  MyAccountPage from './component/MyAccounts/MyAccountPage';
import './component/MyAccounts/MyAccount.css';
import { Redirect } from 'react-router-dom';
class MyAccount extends Component{
    constructor(props){
        super(props);

    }
    
    render(){
        console.log(this.props.getToken)
        if(this.props.getToken != ''){
            return(
                <div className="myAccountPage">
                    <div className="leftSideMenu">
                        <MyAccountMenu/>
                    </div>
                    <div className="rightSidePaging">
                        <MyAccountPage/>
                    </div>
                </div>
            )
        }
        else{
            return <Redirect to="/signin"/>
        }
        
    }

}


const mapStateToProps = (state) => {
    return {
      getToken: state.WCToken
    }
  }
export default connect(mapStateToProps)(MyAccount);