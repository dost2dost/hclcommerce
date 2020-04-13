import React, {Component}  from 'react'; 
import { Link} from 'react-router-dom';  
import LeftMenu from './LeftMenu';
import SubCategory from './SubCategory' 
import FiltersPage from './FiltersPage'
import MainCategoryPage  from "./MainCategoryPage";
import LeftMenuMainCat from "./LeftMenuMainCat";
import './category.css';

class Category extends Component{
    constructor(props){
        super(props);
        this.state ={
            items: [],
            isLoaded: false,
            lastAccess: ''
        }
    }
     
    render(){
        //console.log(this.props.location.search.substring(1,6)+"<<<<<<<get cat from cat page")
        let getCat = this.props.location.search.substring(1,6)
        let subSearch = this.props.location.search
        //console.log(getCat)
        let mainCategori = ''
        let callFromSub = {subcat: '', categoryCall: getCat, subSrch: subSearch}
        if(this.props.location.search.includes('SubCat')){
            //console.log(getCat+":static");
            callFromSub = {subcat: 'SubCat', categoryCall: getCat, subSrch: subSearch}
        }
        else if(this.props.location.search.includes('Main')){
            callFromSub = {subcat: 'Main', categoryCall: getCat, subSrch: subSearch}
        }
        // else{
        //     lastAccess = getCat
        //     callFromSub = {subcat: 'SubCat', categoryCall: lastAccess}
        //     console.log(callFromSub.categoryCall+"<<<<<<<")
        // }
        //console.log("CATEGORY"+this.props.location.search)
        return(
        <div className="mainDiv CategoryPage"> 
            <div className="featuredProducts"> 
        <div className="leftMenu"><p>Brands {getCat}</p>
            {callFromSub.subcat == 'Main' ? <LeftMenuMainCat callFromSubCat={callFromSub}/> : <LeftMenu callFromSubCat = {callFromSub}/>}
            </div>
                <div className="imagesHolder">
                  { callFromSub.subcat === '' ? 
                        <SubCategory callCat = {callFromSub} /> : 
                    callFromSub.subcat === 'SubCat' ? 
                        <FiltersPage callCat = {callFromSub} /> :
                  callFromSub.subcat === 'Main' ? <MainCategoryPage callCat = {callFromSub} /> : null }
                </div>
            </div>
        </div>
        )
    }
}
 
export default Category;