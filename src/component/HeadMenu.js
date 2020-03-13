import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class HeadMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            items: [],
            isLoaded: false,
        };
    }
    componentDidMount(){
        fetch('http://192.168.7.167/wcs/resources/store/11901/categoryview/@top')
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
                
            })
        });
    }

    render(){
        
        var {isLoaded, items}= this.state;
        if(!isLoaded){
            return <div>Loading...</div>
        }
        else{
            return(
                <div className="menuHolder">
                     {[items].map((item, index) => (
                        <div key={item.recordSetTotal}>
                            <a className="products" href="#">Products</a>
                            <ul  className="unorderList">
                               
                            {item.CatalogGroupView.map(insideItems => (
                              <li key={insideItems.uniqueID}>
                         
                            <Link  to={`/Category/?${insideItems.uniqueID}`}>{insideItems.name}</Link>
                            </li>
                            ))}
                            </ul>
                        </div>
                    ))}
                </div>

                 /* <div className="menuHolder">
                        
                    {[items].map((item, index) => (
                        <div key={item.recordSetTotal}>
                            {item.CatalogGroupView.slice(1, 8).map(insideItems => (
                        <div className="cateItem" key={insideItems.uniqueID}>
                            <Link to={`/SubCategory/?${insideItems.uniqueID}`}>{insideItems.name}</Link>
                        </div>
                            ))}
                        </div>
                    ))}
                    <div className="cateItem" >
                        <Link to={`/Category/?all`}>All-Categories</Link>
                    </div>
                </div> */ 
            )
        }
    }

}
export default HeadMenu;