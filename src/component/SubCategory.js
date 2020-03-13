import React, {Component}  from 'react';
import { parse } from 'query-string';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 
import ReactDOM from 'react-dom'; 
import LeftMenu from './LeftMenu';
import queryString from 'querystring'
import './category.css';

class SubCategory extends Component{
    constructor(props){
        super(props);
        this.state ={
            items: [],
            isLoaded: false,
            categoryCalled: '', 
            loaderActive: '<span></span>'
        }
    }
    componentDidUpdate(props){ 
         if(this.props.callCat != this.state.categoryCalled){
            
            this.getDataFromServer(this.props.callCat);
            this.setState({
                categoryCalled: this.props.callCat
            })
          }
         
    }
    componentDidMount(props){
        this.setState({
            categoryCalled: this.props.callCat
        }) 
        this.getDataFromServer(this.props.callCat);  
    } 
    getDataFromServer = (getCat) => { 
        this.setState({loaderActive:'<div><img width="300" height="200" src="/Images/loader.gif"/></div>'}) 
        let getUrl = `http://192.168.7.167/wcs/resources/store/11901/customProductview/byCategory/${getCat}` 
        fetch(getUrl) 
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json 
            })
        }).catch(e => console.log(e));
        this.setState({loaderActive:''}) 
    }
    render(){
        var { isLoaded, items } = this.state;
        if(!isLoaded){
            return <div><img width="300" height="200" src="/Images/loader.gif"/></div>
        }
        else{ 
            return(
                <div>
                    {this.state.loaderActive}
                    {[items].map(item => (
                        <div  key={item.recordSetTotal}> 
                        {item.catalogEntryView.map(insideItems => (
                            //if(item.recordSetTotal>1){
                            <div className="product" key={insideItems.uniqueID}>
                                <div className="name">
                                <Link to={`/Product/?${insideItems.uniqueID}`}>
                                    <div className="name"><img alt = {insideItems.name} src={insideItems.thumbnail} /></div>
                                </Link>
                                </div>
                                <div className="person">{insideItems.name}</div> 
                                <div className="price">$ {insideItems.price[1].value}</div>
                                <div className="addToCart">
                                <Link to={`/Product/?${insideItems.uniqueID}`}>
                                    Add to Cart
                                </Link>
                                </div>

                            </div>
                            //}
                        ))}    
                    </div>
                    ))}
                </div>             
            )
        }
}
}
 
export default SubCategory;