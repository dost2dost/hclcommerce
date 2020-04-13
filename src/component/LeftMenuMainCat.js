import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import queryString from 'querystring'

class LeftMenuMainCat extends Component{
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

            this.updateCateCall(this.props.callFromSubCat.subSrch)
            
        }
    lastCall = '';
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps != this.props){
            this.updateCateCall(this.props.callFromSubCat.subSrch)
            
        }
    }
    updateCateCall = (searchString) => { 
        let getSign = searchString.indexOf("&");
        let cateCall = searchString.substring(1,getSign);
        let goUrl = 'https://192.168.17.91:5443/wcs/resources/store/1/categoryview/byParentCategory/'+cateCall
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
                <div className="menuHolder">
                        
                    {[items].map((item, index) => (
                        <div key={index}>
                            {item.CatalogGroupView.map(each => (
                                <div className="cateItem" key={each.uniqueID}>
                                    <Link to={each.uniqueID.length > 2 ? `/Category/?${each.uniqueID}` : `/Category/?${each.uniqueID}&cat=Main`}>
                                        {each.name} ({each.count})</Link>
                                </div>
                            ))}  
                        </div>
                    ))} 
                </div>
            )
        }
    }

}
export default LeftMenuMainCat;