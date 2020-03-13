import React, { Component } from "react";
import image3 from './image3.jpg';
import image2 from './image2.jpg';
import image4 from './image4.jpg';

class DisplayImages extends Component{
    
    render()
    {
        return(
           
            <div className="container">
                    
            
            <div className="row">
                <div className ="col-md-4">
                <a href="/car" > <img src={image2}  alt="image2" /></a>
                
                </div>
                <div className ="col-md-4">
                <a href="/car" >< img src={image2}  alt="image2" /></a>
                
                </div>
                <div className ="col-md-4">
                <a href="/car"><img src={image2}  alt="image2" /></a>
                
                </div>
            </div>
            <div className ="row">

                <div className="col-md-4">
                    <a href="/bag"><img src={image3} alt="image3" /></a>
                    <div>
                        <a href="/bag">
                        <i className="fas fa-plus-circle"> Bag</i>   
                        </a>
                    </div>
                </div>

                <div className="col-md-4">
                    <a href="/bag"><img src={image3} alt="image3" /></a>
                    <div>
                        <a href="/bag">
                        <i className="fas fa-plus-circle"> Bag</i>   
                        </a>
                    </div>
                </div>
                <div className="col-md-4">
                    <a href="/bag"><img src={image3} alt="image3" /></a>
                    <div>
                        <a href="/bag">
                        <i className="fas fa-plus-circle"> Bag</i>   
                        </a>
                    </div>
                </div>
                 
                

                </div>
                <div className ="row">
                <div className="col-md-4">
                   <a href="/noodels"> <img src={image4} alt="image4" /></a>
                    <div>
                        <a href="/noodels">
                        <i className="fas fa-plus-circle"> NOODELS</i>   
                        </a>
                    </div>
                </div>
                <div className="col-md-4">
                    <a href="/noodels"><img src={image4} alt="image4" /></a>
                    <div>
                        <a href="/noodels">
                        <i className="fas fa-plus-circle"> NOODELS</i>   
                        </a>
                    </div>
                </div>
                <div className="col-md-4">
                    <a href="/noodels"><img src={image4} alt="image4" /></a>
                    <div>
                        <a href="/noodels">
                        <i className="fas fa-plus-circle"> NOODELS</i>   
                        </a>
                    </div>
                </div>
                 
            </div>
            
        </div>
        );
    }
}




 export default DisplayImages;