import React, {Component}  from 'react';
import { parse } from 'query-string';
import {BrowserRouter as Router, Route, Link,} from 'react-router-dom'; 
import { connect } from "react-redux";
import ReactDOM from 'react-dom'; 
import LeftMenu from './LeftMenu';
import queryString from 'querystring'
import './category.css';
import Skeleton from '../Skeleton/Skeleton'
class SubCategory extends Component{
    constructor(props){
        super(props);
        this.state ={
            items: [],
            isLoaded: false,
            categoryCalled: '', 
            loaderActive: true,
            subCat: ''
        }
    }
    componentDidUpdate(props){ 
        console.log(this.props.callCat.categoryCall+"<<subCategoryPage")
        console.log("subCategoryPage >>"+this.props.callCat.subcat)
         if(this.props.callCat.categoryCall != this.state.categoryCalled){            
            this.getDataFromServer(this.props.callCat.categoryCall);
            
            this.setState({
                categoryCalled: this.props.callCat.categoryCall,
                loaderActive: true
            })
          }
         
    }
    componentDidMount(props){
        this.setState({
            categoryCalled: this.props.callCat.categoryCall
        }) 
        this.getDataFromServer(this.props.callCat.categoryCall);  
    } 
    getDataFromServer = (getCat) => { 
        
        this.setState({loaderActive:'<div><img width="300" height="200" src="/Images/loader.gif"/></div>'}) 
        let getUrl = this.props.getAppSet.API.productById+getCat
        //`https://192.168.17.91:5443/wcs/resources/store/1/categoryview/byParentCategory/5`  
        fetch(getUrl) 
        .then(res => res.json(
            
        ))
        .then(json => {
            
            this.setState({
                isLoaded: true,
                items: json,
                loaderActive: false 
            })
        }).catch(e => console.log(e));
        this.setState({loaderActive:''}) 
        
    }
    addToCartHandler(id){
        console.log(id+'id inside ');
    }
    render(){
        var { isLoaded, items } = this.state;
        if(!isLoaded){
            return <Skeleton />
        }
        else{ 
            return(
                <>
                {this.state.loaderActive ? <Skeleton /> :                    
                    [items].map(item => (
                        <div  key={item.recordSetCount} > 
                        {item.CatalogEntryView.map(insideItems => (
                            //if(item.recordSetTotal>1){
                            <div className="product" key={insideItems.uniqueID}>
                                <div className="name">
                                <Link to={`/Product/?${insideItems.uniqueID}`}>
                                    <div className="name"><img alt = {insideItems.name} src={`${this.props.getAppSet.serverBaseURL}${insideItems.thumbnail}`} /></div>
                                </Link>
                                </div>
                                <div className="person">{insideItems.name}</div> 
                                <div className="price">$ {insideItems.Price[0].priceValue}</div>
                                <div className="addToCart">
                                    {/* <a onClick={this.addToCartHandler.bind(this, insideItems.uniqueID)}>Add to Cart</a> */}
                                {/* <Link to={`/Product/?${insideItems.uniqueID}`}>
                                    Add to Cart
                                </Link> */}
                                </div>

                            </div>
                            //}
                        ))}    
                    </div>
                    ))
                }
                </>             
            )
        }
}
}
const mapStateToProps = (state) => {
    return { 
        getAppSet: state.getAppSet
    }
};
export default connect(mapStateToProps, null)(SubCategory);