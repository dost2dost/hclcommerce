import React, { Component } from 'react'; 
class MyAccountPage extends Component{
    render(){
        return(
            <div>
                <h2>My Account</h2>
                <p className="headAccInfo">Account Information</p>
                <hr />
                <div className="AccountInfo">
                    <div className="contactInfo">
                        <p>Contact Information</p>
                        <p>Karim Wasily <br/> karim.zarak@royalcyber.com</p>
                        <p>
                            <a href="#">Edit</a> | 
                            <a href="#">Change Password</a>
                        </p>
                    </div>
                    <div className="newsLetter">
                        <p>Newsletters</p>
                        <p>You aren't subscribed to our newsletter.
                            <br/>
                            <a href="#">Edit</a>
                        </p>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <p className="headAccInfo">Address Book</p>
                <hr />
                <div className="AccountInfo">
                    <div className="contactInfo">
                        <p>Address Book</p>
                        <p>You have not set a default billing address.</p>
                        <p>
                            <a href="#">Edit Address</a>
                        </p>
                    </div>
                    <div className="newsLetter">
                        <p>Default Shipping Address</p>
                        <p>You have not set a default shipping address.
                            <br/>
                            <a href="#">Edit Address</a>
                        </p>
                    </div>
                </div><br/>
                <br/>
                <br/>
                <p className="headAccInfo">My Recent Reviews</p>
                <hr />
                <div className="AccountInfo">
                    <div className="contactInfo">
                        <p>Yealink SIP-T19P E2 - VoIP phone - SIP, SIP v2</p>
                        <p> .</p>
                        <p>
                            <a href="#"> </a>
                        </p>
                    </div>
                    <div className="newsLetter">
                        <p> </p>
                        <p> 
                            <br/>
                            <a href="#"> </a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}export default MyAccountPage;