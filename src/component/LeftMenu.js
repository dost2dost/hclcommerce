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

        fetch('http://192.168.7.167/wcs/resources/store/11901/categoryview/byParentCategory/'+this.props.callFromSubCat.categoryCall)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        }).catch(e => console.log(e)); 
    }
    render(){
        console.log(items)
        var {isLoaded, items}= this.state;
        if(!isLoaded){
            return <div>Loading...</div>
        }
        else{ 
            return(
                <div className="menuHolder">
                        
                    {[items].map((item, index) => (
                        <div key={item.recordSetTotal}>
                            {item.CatalogGroupView.map(insideItems => (
                        <div className="cateItem" key={insideItems.uniqueID}>
                            <Link to={`/Category/?${insideItems.uniqueID}&cat=SubCat`}>{insideItems.name}</Link>
                        </div>
                            ))}
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