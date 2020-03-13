import React, { Component } from "react";
import image3 from './image3.jpg';

class Bag extends Component{

    render(){
        return(
            <div >
                <img src={image3}  alt="image3" />
                <div>
                <a href="/" className="btn btn-primary mb-3">
                   <i className="fas fa-plus-circle">BuyNow</i>
                   </a></div>
                   <div>
                   <a href="/" className="btn btn-primary mb-3">
                   <i className="fas fa-plus-circle">3D View</i>
                   </a></div>
            </div>
        );
    }

}

 export default Bag;

 
