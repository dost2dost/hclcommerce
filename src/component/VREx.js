//import 'aframe';
//import { Scene, Entity } from 'aframe-react';
import React from 'react';
import './VRex.css';

 
function VREx() {
  return (
    <div className="vrEx">
 <a-scene>
  <a-entity gltf-model="Images/SunGlasses.gltf" scale="20 15 17"  position="2 1 -10" >
     </a-entity>
    </a-scene> 
    </div>
    );
}


export default VREx;