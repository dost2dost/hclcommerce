import React, { Component } from "react";
import { connect } from "react-redux";
class ShoppingCartItemDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            items : [],
            isLoaded : false
        }
    }
    componentDidMount(){
        this.getCardDetails();    
    }
    getCardDetails = () => {
        console.log(this.props.getWCToken+"<<<>>>"+this.props.getWCTrustedToken)
        fetch('https://192.168.17.91:5443/wcs/resources/store/1/cart/@self', {
            //method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'WCToken':  this.props.getWCToken,
                'WCTrustedToken': this.props.getWCTrustedToken
            }
        })
        .then(rs=>rs.json())
        .then((rslt)=>{
            this.itemInCart  = rslt;
            this.setState({
                items: rslt,
                isLoaded: true
            })
            console.log(this.itemInCart)
            
        },
            (error)=>{console.log('Server Error')
        });
    }
    render(){
        console.log(this.state.items);
        if(this.state.isLoaded){
            return (
            <div className="eachProduct" >
                <div className="thumbnail"><img src="/Images/1.jpg" /> </div>
                <div className="otherInfo">
                    <div className="clickText"><p>
                                ASUS VivoBook F512DA 15.6" Ultraslim Laptop - AMD Ryzen 5 3500U, 8GB RAM, 512GB SSD, Windows 10, McAfee 1-Year
                        </p></div>
                    <div className="price">$250.00</div>
                    <div className="qtyEditDelete">
                        <div className="qty">
                            <span>Qty:</span>
                            <input type="text" placeholder="1"/>
                        </div>
                        <div className="edit"><a href="#">Edit </a></div>
                        <div className="delete"><a href="#"> Delete</a></div>
                        <div className="clearBoth"></div>
                    </div>
                </div>
                <div className="clearBoth"></div>
            </div>
            )}
        else{
            return(<div>Still Loading</div>)
        }
    }
};
const mapStateToProps = (state) => {
    return {
        getResourceName : state.resourceName,
        getWCToken : state.WCToken,
        getWCTrustedToken: state.WCTrustedToken
    }
};
export default connect(mapStateToProps, null)(ShoppingCartItemDetails)