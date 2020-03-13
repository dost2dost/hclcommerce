import React, {Component}  from 'react'; 
import { Link} from 'react-router-dom';  
import LeftMenu from './LeftMenu';
import SubCategory from './SubCategory'
import './category.css';

class Category extends Component{
    constructor(props){
        super(props);
        this.state ={
            items: [],
            isLoaded: false,
        }
    }
     
    render(){
        //console.log(this.props.location.search.substring(1,6)+"<<<<<<<get cat from cat page")
        let getCat = this.props.location.search.substring(1,6)
        let callFromSub = {subcat: '', categoryCall: getCat}
        if(this.props.location.search.includes('SubCat')){
            //console.log(getCat+":static");
            callFromSub = {subcat: 'SubCat', categoryCall: getCat}
        }
        
        return(
        <div className="mainDiv CategoryPage"> 
            <div className="featuredProducts"> 
        <div className="leftMenu"><p>Main Menu {getCat}</p><LeftMenu callFromSubCat = {callFromSub}/></div>
                <div className="imagesHolder"><SubCategory callCat = {getCat} /></div>
            </div>
        </div>
        )
    }
}
 
export default Category;