import React, {Component } from 'react';
import {Link} from 'react-router-dom';
import './Footer.css'; 

class  Footer extends Component {
   constructor(props){
    super(props);
    this.state = {search : "Search Product"};
   }
   getSearch = (event) =>{
       this.setState ({search : event.target.value});
   }
    render(){
    return( 
        <div className="footerMain">
            <div className="footerRedPortion">
            <p> 
                <Link to="/">Home</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/NewAccount">Register New User</Link>
                <Link to="/contact">Help</Link>
             </p>
            </div>
            <div className="infoBasic">
            <div className="PriceMatch">
                <div></div>
                <div>
                    <h3>Price Match Guarantee</h3>
                    <p>Score the lowest price possible, period. We'll match if not beat any price you find elsewhere with no questions asked.</p>
                </div>
            </div>
            <div className="freeShip">
                <div></div>
                <div>
                    <h3>Free Shipping Over $35</h3>
                    <p>Shipping is on us when you order totals $35 or more.</p>
                </div>
            </div>
            <div className="Installations">
                <div></div>
                <div>
                    <h3>Installations</h3>
                    <p>Instantly schedule one of our white glove services to get your products set up the right way.</p>
                </div>
            </div>
        </div>
        <div className="grayPortion">
           <h1>Insider Tips, Deals and More</h1>
            <p>Stay in the loop to be the first to know about new products and limited time deals.</p>
            <input type="text" placeholder={this.state.search} onChange={this.getSearch}/>
            <a href="">Subscribe</a>
        </div>
        <br/>
        <hr/>
        <div className="connect">
            <h3>Connect With Us</h3>
            <div className="socialIcons">
                <a className="facebook" href="http://www.facebook.com/CircuitCity-1663290060604757/" target="_blank" >&nbsp;</a>
                <a className="twiter" href="http://twitter.com/CircuitCity" target="_blank">&nbsp;</a>
                <a className="instagram" href="http://www.instagram.com/circuitcity/" target="_blank">&nbsp;</a>
                <a className="googleplus" href="http://plus.google.com/102502279675017944350" target="_blank" >&nbsp;</a>
            </div>
        </div>
        <hr/>
        <br/>
        <br/>
        </div> 
        
    )
    }
}
export default Footer;