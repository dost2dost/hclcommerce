const podReducer=(state=0,action)=>{
    switch(action.type){
        case 'PID':
            return state=action.payload;
             default:
                return state;
    }

}