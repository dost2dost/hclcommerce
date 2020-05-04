import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import queryString from 'querystring'
import { connect } from "react-redux";

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
        let goUrl = this.props.getAppSet.API.productByParentCate+cateCall
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
                                        {each.name} 
                                        {/* ({each.count}) */}
                                        </Link>
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
export default connect(mapStateToProps, null)(LeftMenuMainCat);