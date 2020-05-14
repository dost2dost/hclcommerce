import React, { Component } from 'react';

class MyVrModel extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                 <model-viewer camera-controls autoplay shadow-intensity="1" src="Images/thredmodels/13129.glb" >


</model-viewer>

            </div>
         );
    }
}
 
export default MyVrModel;