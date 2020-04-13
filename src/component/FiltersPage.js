import React, { Component } from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 
import './category.css';
import Skeleton from '../Skeleton/Skeleton'

class FiltersPage extends Component{
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
    componentDidUpdate(prevProps, prevState, snapshot){ 
        if(prevProps !== this.props){
             
            this.getDataFromServer(this.props.callCat)
        }
         
    }
    componentDidMount(props){
        this.setState({
            categoryCalled: this.props.callCat.categoryCall
        })  
        this.getDataFromServer(this.props.callCat.categoryCall);  
    } 
    getDataFromServer = (getC) => { 
        let getLoc = this.props.callCat.subSrch.indexOf("Filter")+7
        let getSrch = this.props.callCat.subSrch.substring(getLoc)
        let getCate = this.props.callCat.subSrch.substring(1,6)
    
        this.setState({loaderActive:'<div><img width="300" height="200" src="/Images/loader.gif"/></div>'}) 
        let getUrl = `http://192.168.17.91:3737/search/resources/store/1/productview/byCategory/${getCate}?facet=${getSrch}`
        console.log(getUrl)
        //`url2: 'http://192.168.17.91:3737/search/resources/store/1/productview/byCategory/10015?facet=Mayflower'`  
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
    render(){
        var { isLoaded, items } = this.state; 
        console.log('getItems below')
            console.log(this.state.items)      
        return(
            <div>
              {[items].map((item, index) => (
                        <div key={index}> 
                            {item.catalogEntryView ? item.catalogEntryView.map(insideItems => (
                                <div className="product" key={insideItems.uniqueID}>
                                <div className="name">
                                <Link to={`/Product/?${insideItems.uniqueID}`}>
                                    <div className="name"><img alt = {insideItems.name} src={`https://192.168.17.91:8443${insideItems.thumbnail}`} /></div>
                                </Link>
                                </div>
                                <div className="person">{insideItems.name}</div> 
                                <div className="price">$ {insideItems.price[0].value}</div>
                                <div className="addToCart">
                                    
                                </div>

                            </div>
                            )): null} 
                        </div>
                    ))}
            </div>             
        )
    }
}
export default FiltersPage 