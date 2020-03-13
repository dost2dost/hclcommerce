import React from 'react';
import {Link } from 'react-router-dom';


class VRModel extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         model: this.props.location.search.substring(1.1)  
      }
   }
   render() {
      console.log(this.props);
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
     
            <model-viewer camera-controls autoplay shadow-intensity="1" src="Images/3dModels/BasketBall.glb" >


</model-viewer>

<Link to={`/Product/?${this.props.location.search.substring(1.1)}`}>Go Back</Link>
            </div>
         </div>
      );
   }
}
export default VRModel;