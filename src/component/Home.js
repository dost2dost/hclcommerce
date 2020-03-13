import React, { Component } from 'react';
import './Home.css';
import { parse } from 'query-string';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 
import ReactDOM from 'react-dom'; 
class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            items: [],
            isLoaded: false,

        }
    }
    componentDidMount(){
        //fetch('http://192.168.7.167/wcs/resources/store/11901/categoryview/@top')
        fetch('http://192.168.7.167/wcs/resources/store/11901/productview/byCategory/11616')
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        });
    } 
    render(){
        var { isLoaded, items} = this.state;
        if(!isLoaded){
            return <div><img width="300" height="200" src="/Images/loader.gif"/></div>
        }
        else{
            return(
                <div className="mainDiv">
                    <div className="mainBanner">
                        <div className="imageMain">
                        <Link to={`/Category/?all`}><img src="https://www.circuitcity.com/pub/media/hero/cc_1350x525_c.jpg" /></Link>
                        </div>
                    </div>
                    <div className="featuredProducts">
                        <h2>Featured Products</h2>
                        <div className="imagesHolder">
                            {[items].map((item, index) => (
                                <div key={item.recordSetTotal}>
                                     {item.CatalogEntryView.map(insideItems => (
                                    <div className="product" key={insideItems.uniqueID}>
                                        <div className="email">
                                            <Link to={`/Product/?${insideItems.uniqueID}`}>
                                                <div className="name"><img src={insideItems.fullImage} /></div>
                                            </Link>
                                          </div>
                                          <div className="person">{insideItems.name}</div> 
                                          <div className="addToCart">
                                          <Link to={`/Product/?${insideItems.uniqueID}`}>
                                              Add to Cart
                                          </Link>
                                          </div>
                                        
                                    </div>
                                     ))}
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            )
        }
}
}
export default Home;