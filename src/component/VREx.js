//import 'aframe';
//import { Scene, Entity } from 'aframe-react';
import {Link } from 'react-router-dom';
import React from 'react';
import './VRex.css';
//import '../component/css/MyStyle.css'


function VREx(props) {
const productId=props.location.pid.myval;
const modelurl="Images/thredmodels/"+productId+".glb"
  return (
    <div className="vrEx">
      <Link  to={`/Product/?`+productId}>Go Back
      
      </Link>
      <div>
      
 <a-scene >
 
  <a-entity gltf-model={modelurl} scale="0.1 0.1 0.1"  position="2 2 -10" >
     </a-entity>
    </a-scene> 
  
    </div>
    </div>
    );
}


export default VREx;