import React from 'react';  
import {  Link} from 'react-router-dom';
 
    
const MainMenu= () =>{
    const ProductCategory = [
        {
            id:1,
            ProductName:"Appliances"		
        },
        {
            id:2,
            ProductName:"CellPhones"		    
        },
        {
            id:3,
            ProductName:"SmartHome"		
        }
    ]
    const productCats = ProductCategory.map( (GetCats, i) =>{
        return <li key={ProductCategory[i].id}><Link to={`/Category/${ProductCategory[i].id}`}>{ProductCategory[i].ProductName}</Link></li>
        //<li><Link to={`Category${ProductCategory[i].id}`}>{ProductCategory[i].ProductName}</Link></li>
    })
    return ( 
       <ul>  
            {productCats} 
       </ul>
    )
}
export default MainMenu;
