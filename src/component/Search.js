import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import SubCategory from './SubCategory'
import FiltersPage from './FiltersPage'
import MainCategoryPage from "./MainCategoryPage";
import LeftMenuMainCat from "./LeftMenuMainCat";
import { connect } from "react-redux";

import Skeleton from '../Skeleton/Skeleton'
import './category.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            searchStart: '',
            searchNumItems: '',
            searchItem: ''
        }
    }
     
    componentDidMount(props) {
        this.showSearchResult()
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps !==  this.props){
            console.log('props not matched')
            this.showSearchResult()
        }
    } 
    showSearchResult = () => {
        let searchWord = this.props.location.search.substring(8)
        console.log(searchWord)
        fetch(this.props.getAppSet.API.searchTerm+searchWord+'?searchSource=S')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json,
                    isLoaded: true,
                    searchStart: true,
                    searchNumItems:json.recordSetCount,
                    searchItem: this.props.location.search.substring(8)
                })

            }).catch(
                e => console.log(e)
                //this.setState
                );
    }
    render() {
        var { isLoaded, items } = this.state;
        if(!isLoaded){
            return <Skeleton />
        }
        else{ 
            return(
                <div className="mainDiv CategoryPage">
                <div className="featuredProducts"> 
                <div className="leftMenu"><p>&nbsp;</p></div>
                {/* <div className="leftMenu">
                    {[items].map((item, index) => (
                            <div key={index}> 
                                {item.FacetView ? item.FacetView.slice(1).map(item1 => (
                                    <div key={item1.value}>
                                    {item1.Entry.map((item2, index) => (
                            <div className="cateItem" key={index}> 
                                <Link to={`/Category/? &cat=SubCat&Filter=${item2.label}`}>{item2.label} </Link>
                            </div>
                                    ))}
                                    </div>
                                )): null} 
                            </div>
                        ))}
                </div> */}

                <div className="imagesHolder"> 
                <div className="searchHeading"><h1>Search results for "{this.state.searchItem}" ({this.state.searchNumItems} matches.)</h1></div>
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
                </div>
                </div>   

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
export default connect(mapStateToProps, null)(Search);