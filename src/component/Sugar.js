import React, { Component } from "react";
import image2 from './image2.jpg';

class Sugar extends Component{

    render(){
        return(
            <div >
                <img src={image2}  alt="image2" />
                <div>
                <a href="/ARVIEW" className="btn btn-primary mb-3">
                   <i className="fas fa-plus-circle">ARView</i>
                   </a></div>
                   <div>
                   <a href="/3DVIEW" className="btn btn-primary mb-3">
                   <i className="fas fa-plus-circle">3DVIEW</i>
                   </a></div>
            </div>
        );
    }

}

 export default Sugar;

 
