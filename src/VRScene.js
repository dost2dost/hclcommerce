import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

 
class VRScene extends React.Component {
  render () {
    return (
      <a-scene>
 
    <a-entity
      id="myMod" gltf-model={process.env.PUBLIC_URL+"Images/scene.gltf"} scale="60 60 -77" 
      rotation="120.00 120.00 -120.00" position="2 3 -10"
    />
 </a-scene> 
    );
  }
}
 
//ReactDOM.render(<VRScene/>, document.querySelector('#root'));
export default VRScene;