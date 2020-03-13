import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

  

function CircuteNavbar(){

    return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
     
      {  //<a className="navbar-brand" href="">
           // Product
            //</a>
        }
        
      
         <a className="navbar-brand" href="/">
           Product</a>

            <a className="navbar-brand" href="">
            Service
            </a>
          

        
            <a className="navbar-brand" href="">
        Details
            </a>
            



        
   
        
            </nav>
    );

}

export default CircuteNavbar;