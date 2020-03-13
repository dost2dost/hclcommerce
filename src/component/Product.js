import React, {Component}  from 'react';
class Product extends Component{
    render(){
      
        return(
            <h1>Product Page1</h1>
            <div className="">
                <div className="imagePortion">
                    <div className="mainImage"></div>
                    <div className="subImages"></div>
                </div>
                <div className="txtDescription">
                    <div className="description"></div>
                    <div className="priceDetail">
                        <div className="price"></div>
                        <div className="sku"></div>
                    </div>
                    <div className="quanty">
                        <div className="qtyTxt">Qty</div>
                        <div className="qtyIn"><input type="text" value="1"/></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Product;