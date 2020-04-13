import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import './product.css';
import VRex from './component/VREx';
import ProdSkeleton from './Skeleton/ProductSkeleton'
import ShoppingCart from './component/ShoppingCart'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 
class MyProduct extends Component{
    constructor(props){
        var etPr= props.location.search;
        super(props);
        this.state ={
            quntity: '1',
            items: [],
            isLoaded: false,
            callAPI: false
        }
    }
    getSearch = (event) =>{
        this.setState ({quntity : event.target.value});
    }
    componentDidMount(props){
        this.setState ({
            isLoaded: false,
        })
         const { handle } = this.props.location.search;
        
        fetch('https://192.168.17.91:5443/wcs/resources/store/1/productview/byId/'+this.props.location.search.substring(1.1))
        .then( res => res.json())
        .then( json => {
            this.setState ({
                isLoaded: true,
                items: json,
            })
        }).catch(e => console.log(e)); 
    }
    AddToCart = (event) => {
        console.log(this.state.items.CatalogEntryView[0].uniqueID)
        //let getId = '';//this.state.items.CatalogEntryView[0].uniqueID;
        this.setState({callAPI: true})
    }
    render(){
        var { isLoaded, items } =this.state;
        const getParams = this.props.location.search; 
        let shopCart = ('sleocm');
        if(this.state.callAPI){
            shopCart = (<ShoppingCart callAPI={this.state.items.CatalogEntryView[0].uniqueID} />);
            console.log('this is called')
        }
        return(
            <div className="productPage">
                <div>{shopCart}</div>
                {!this.state.isLoaded ? <ProdSkeleton /> : 
                [items].map((item, index) => (
                    <div  key={item.recordSetTotal}>
                        {item.CatalogEntryView.map(insideItems => (
                            <div className="product" key={insideItems.uniqueID}>
                                <div className="imagePortion">
                                    
                                    <div className="mainImage"><img src={`https://192.168.17.91:8443${insideItems.thumbnail}`}/></div>
                                    {/* <div className="subImages"><img src={`${item.thumbnailUrl}`}/><img src={`${item.thumbnailUrl}`}/><img src={`${item.thumbnailUrl}`}/><img src={`${item.thumbnailUrl}`}/></div> */}
                                    </div>
                                <div className="txtDescription">
                                    <div className="vrAr">
                                    <Link  className="vrLink" to={`/VRModel/?${this.props.location.search.substring(1.1)}`} >VR Model</Link> 
                                    <Link  className="arLink" to={`/VRex`} >AR Access</Link>
                                </div>
                                <div className="description">
                                    {insideItems.longDescription===undefined ? ' ' : insideItems.longDescription}
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
                                        <div className="add2CartDiv"><input onClick={this.AddToCart} type="button" value="Add to Cart"/></div>
                                    </div>
                                </div>
                            </div>
                        ))} 
                        
                    </div>
                ))}
            </div>
        )
        }
    //}
}
export default MyProduct;