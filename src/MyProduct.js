import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import './product.css';
import VRex from './component/VREx';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 
class MyProduct extends Component{
    constructor(props){
        var etPr= props.location.search;
        super(props);
        this.state ={
            quntity: '1',
            items: [],
            isLoaded: false,
        }
    }
    getSearch = (event) =>{
        this.setState ({quntity : event.target.value});
    }
    componentDidMount(props){
        
         const { handle } = this.props.location.search;
        console.log(this.props.location.search.substring(1.1) +"<ddd>");
        //var getNewUrl = 'https://jsonplaceholder.typicode.com/photos/?id='+this.props.location.search.substring(1.1);
        //console.log(getNewUrl);
        fetch('http://192.168.7.167/wcs/resources/store/11901/productview/byId/'+this.props.location.search.substring(1.1))
        .then( res => res.json())
        .then( json => {
            this.setState ({
                isLoaded: true,
                items: json,
            })
        }).catch(e => console.log(e)); 
    }
    render(){
        var { isLoaded, items } =this.state;
        if(!isLoaded){
            return <div><img width="300" height="200" src="/Images/loader.gif"/></div>
        }
        else{
        console.log(this.props);
        const getParams = this.props.location.search; 
        //console.log(getParams.substring(1.1));
        //console.log(props);
        return(
            <div className="productPage">
                {[items].map((item, index) => (
                    <div  key={item.recordSetTotal}>
                        {item.CatalogEntryView.map(insideItems => (
                            <div className="product" key={insideItems.uniqueID}>
                                <div className="imagePortion">
                                    
                                    <div className="mainImage"><img src={insideItems.thumbnail}/></div>
                                    {/* <div className="subImages"><img src={`${item.thumbnailUrl}`}/><img src={`${item.thumbnailUrl}`}/><img src={`${item.thumbnailUrl}`}/><img src={`${item.thumbnailUrl}`}/></div> */}
                                    </div>
                                <div className="txtDescription">
                                    <div className="vrAr">
                                    <Link  className="vrLink" to={`/VRModel/?${this.props.location.search.substring(1.1)}`} >VR Model</Link> 
                                    <Link  className="arLink" to={`/VRex`} >AR Access</Link>
                                </div>
                                <div className="description">
                                    {insideItems.shortDescription===undefined ? ' ' : insideItems.shortDescription}
                                </div>
                                    <div className="priceDetail"> 
                                        <div className="price">
                                            {insideItems.Price === undefined ? '' : `$${insideItems.Price[0].priceValue}`}
                                        </div>
                                        {/* <div className="sku"><b>SKU#:</b> KAL-JK44499SS</div> */}
                                    </div>
                                    <div className="quanty">
                                        <div className="qtyTxt">Qty</div>
                                        <div className="qtyIn"><input type="text" placeholder="1" value={this.state.search} onChange={this.getSearch}/></div>
                                    </div>
                                    <div className="add2Cart"> 
                                        <div className="add2CartDiv"><input type="button" value="Add to Cart"/></div>
                                    </div>
                                </div>
                            </div>
                        ))} 
                        
                    </div>
                ))}
            </div>
        )
        }
    }
}
export default MyProduct;