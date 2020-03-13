import React, { Component } from "react";
import image4 from './image4.jpg';

class Noodels extends Component{


    render(){
        return(
            <div >
                <img src={image4}  alt="image4" />
                <div>
                <a href="/" className="btn btn-primary mb-3">
                   <i className="fas fa-plus-circle">BuyNow</i>
                   </a></div>
                   <div>
                   <a href="/" className="btn btn-primary mb-3">
                   <i className="fas fa-plus-circle">AddToCard</i>
                   </a></div>
            </div>
        );
    }

}

 export default Noodels;

 
