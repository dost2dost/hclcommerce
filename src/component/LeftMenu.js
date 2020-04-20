import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import queryString from 'querystring'

class LeftMenu extends Component{
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

        this.updateCateCall(this.props.callFromSubCat)
        
    }
    lastCall = '';
    componentDidUpdate(props){
        if(this.props.callFromSubCat.categoryCall != this.lastCall && this.props.callFromSubCat.subcat.trim() == ''){
            this.updateCateCall(props)
            this.lastCall = this.props.callFromSubCat.categoryCall   
        }
    }
    updateCateCall = (props ) => { 
        console.log(">>>>>>>>>>>>>>>>>"+this.props.callFromSubCat.categoryCall)
        fetch('https://192.168.17.91:5443/wcs/resources/store/1/productview/byCategory/'+this.props.callFromSubCat.categoryCall)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
            //console.log(json)
        }).catch(e => console.log(e)); 
        
    }
    render(){
        //console.log(items)
        var {isLoaded, items}= this.state;
        //console.log(items[0].recordSetCount)
        if(!isLoaded){
            return <div>Loading...</div>
        }
        else{ 
            return(
                <div className="menuHolder">
                        
                    {[items].map((item, index) => (
                        <div key={index}> 
                            {item.FacetView ? item.FacetView.slice(1).map(item1 => (
                                <div key={item1.value}>
                                    {/* {item1.name} */}
                                {item1.Entry.map((item2, index) => (
                        <div className="cateItem" key={index}> 
                            <Link to={`/Category/?${item.CatalogEntryView[0].parentCategoryID}&cat=SubCat&Filter=${item2.label}`}>{item2.label} </Link>
                        </div>
                                ))}
                                </div>
                            )): null} 
                        </div>
                    ))}
                        {/* <div className="cateItem" >
                            <Link to={`/Category/?all`}>All-Categories</Link>
                        </div> */}
                </div>
            )
        }
    }

}
export default LeftMenu;