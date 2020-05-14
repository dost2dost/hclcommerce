import React from 'react';
import {Link } from 'react-router-dom';
import  {useSelector,useDispatch} from 'react-redux'


class VRModel extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         model:'Images/BasketBall.glb',
         productId:props.location.pid.myval,

      }
   }

   render() {
      console.log("vrvmodel "+this.state.productId);
      const divStyle ={
         width: '25%',
         margin: 'auto'
      };
      const anchorPos  ={
         float: 'left',
         marginLeft: '20px'
      };
      return (
         <div>

         {/* <a href="#" style={anchorPos}> {this.props.location.search.substring(1.1)}</a> */}
         <div style={divStyle}>
     
            <model-viewer camera-controls autoplay shadow-intensity="1" src={'Images/thredmodels/'+this.state.productId+'.glb'} >


</model-viewer>

<Link to={`/Product/?`+this.state.productId}>Go Back</Link>
            </div>
         </div>
      );
   }
}
export default VRModel;