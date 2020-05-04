import React, { Component } from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 
import './category.css';
import { connect } from "react-redux";
import Skeleton from '../Skeleton/Skeleton'

class MainCategoryPage extends Component{
    constructor(props){
        super(props);
        this.state={
            items: [],
            isLoaded: false,
            categoryCalled: ''
        };
        //console.log(props)
    }
        componentDidMount(props){

            this.updateCateCall(this.props.callCat.subSrch)
            
        }
    lastCall = '';
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps != this.props){
            this.updateCateCall(this.props.callCat.subSrch)
            
        }
    }
    updateCateCall = (searchString) => { 
        let getSign = searchString.indexOf("&");
        let cateCall = searchString.substring(1,getSign);
        let goUrl = this.props.getAppSet.API.mainCategory+cateCall
        //console.log(goUrl)
         fetch(goUrl)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
            console.log(json)
        }).catch(e => console.log(e)); 
        
    }
    render(){
        var {isLoaded, items}= this.state;
        console.log(items.recordSetCount)
        if(!isLoaded){
            return <div>Loading...</div>
        }
        else{ 
            return(
                <div className="">
                        
                    {[items].map((item, index) => (
                        <div key={index}>
                            {item.CatalogGroupView.map(each => (
                                <div className="cateItem" key={each.uniqueID}>
                                  <div className="product" key={each.uniqueID}>
                                <div className="name">
                                <Link to={each.uniqueID.length > 2 ? `/Category/?${each.uniqueID}` : `/Category/?${each.uniqueID}&cat=Main`}>
                                    <div className="name"><img alt = {each.name} src={`https://192.168.17.91:8443/wcsstore/ExtendedSitesCatalogAssetStore/${each.thumbnail}`} /></div>
                                </Link>
                                </div>
                                <div className="person">{each.name}</div> 
                                 
                                <div className="addToCart">
                                    {/* <a onClick={this.addToCartHandler.bind(this, insideItems.uniqueID)}>Add to Cart</a> */}
                                {/* <Link to={`/Product/?${insideItems.uniqueID}`}>
                                    Add to Cart
                                </Link> */}
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
const mapStateToProps = (state) => {
    return { 

        getAppSet: state.getAppSet
    }
};
export default connect(mapStateToProps,  null)(MainCategoryPage)