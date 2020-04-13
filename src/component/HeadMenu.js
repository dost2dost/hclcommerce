import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class HeadMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            items: [],
            isLoaded: false,
            menu: '',
            showMenu: false,
            currMenu: -1,
            cssClass : 'closeMenu parentUL'
        };
    }
    componentDidMount(){
        fetch('http://192.168.17.91:3737/search/resources/store/1/categoryview/@top?depthAndLimit=*')
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
                parentItem: false,
                childItem: false
                
            })

        }).catch(e => console.log(e));
    }

    MenuLink = (menuItem, ind) =>{
        if(ind === this.state.currMenu){
            this.setState({
                showMenu: false,
                currMenu: -1,
                cssClass: 'closeMenu parentUL'
            }) 
        }
        else{
        this.setState({
            showMenu: true,
            currMenu: ind,
            cssClass: 'openMenu parentUL'
        }) 
        }
    }
    CloseMenu = () =>{
        this.setState({
            showMenu: false,
            currMenu: -1,
            cssClass: 'closeMenu parentUL'
        }) 
    }
    render(){
        let output = '' 
        if(this.state.showMenu){
            let currArr = this.state.items.catalogGroupView[this.state.currMenu]
            console.log(currArr)
            output=(
                <ul className="parentUL" className={this.state.cssClass}>
                    <li className="parentItem">
                        <Link to={`/Category/?${currArr.uniqueID}&cat=Main`}>{currArr.identifier}</Link>
                    </li>
                {currArr.catalogGroupView.map((subChild, index) => (
                    <li key={index}>
                        <Link to={subChild.uniqueID.length > 2 ? `/Category/?${subChild.uniqueID}` : `/Category/?${subChild.uniqueID}&cat=Main` }>{subChild.identifier}</Link>
                        {subChild.catalogGroupView ? <ul className="childUL">
                            {subChild.catalogGroupView.map((fourthChild, index )=> (
                                <li key={index}><Link to={`/Category/?${fourthChild.uniqueID}`}>{fourthChild.identifier}</Link></li>
                            ))}
                        </ul> : null}

                    </li>
                ))}      
            </ul> 
            )
        }
        var {isLoaded, items}= this.state;
        let display = {display: 'none'}
        if(!isLoaded){
            return <div>Loading...</div>
        }
        else{
            return(
                  <div className="menuHolder">
                        <div className="showMenu" onClick={()=>this.CloseMenu()} >{output}</div>
                    {[items].map((item, index) => (
                        <div key={item.recordSetTotal}>
                            {item.catalogGroupView.map((insideItems, index) => (
                        <div className="cateItem" key={insideItems.uniqueID}>
                        {/* <Link to={`/SubCategory/?${insideItems.uniqueID}`}>{insideItems.name}</Link> */}
                        <a onClick={()=>this.MenuLink(insideItems.uniqueID, index)}>{insideItems.name}</a>
                        {/* <div className={insideItems.uniqueID} style={display}>
                              <ul>
                                {insideItems.catalogGroupView.map((subChild, index) => (
                                    <li key={index}>{subChild.identifier}
                                        {subChild.catalogGroupView ? <ul>
                                            {subChild.catalogGroupView.map((fourthChild, index )=> (
                                                <li key={index}>{fourthChild.identifier}</li>
                                            ))}
                                        </ul> : null}
                                    </li>
                                ))}      
                            </ul>          
                        </div> */}
                        </div>
                            ))}
                        </div>
                    ))}
                    {/* <div className="cateItem" >
                        <Link to={`/Category/?all`}>All-Categories</Link>
                    </div> */}
                </div>  

                /* <div className="menuHolder">
                     {[items].map((item, index) => (
                        <div key={item.recordSetTotal}>
                            <a className="products" href="#">Products</a>
                            <ul  className="unorderList">
                               
                            {item.CatalogGroupView.map(insideItems => (
                              <li key={insideItems.uniqueID}>
                         
                            <Link  to={`/Category/?${insideItems.uniqueID}`}>{insideItems.name}</Link>
                            </li>
                            ))}
                            </ul>
                        </div>
                    ))}
                </div>*/
            )
        }
    }

}
export default HeadMenu;