const iState ={
    userId: '',
    email:  '',
    resourceName : '',
    braintreeToken: '',
    WCToken: '',
    WCTrustedToken: '',
    personalizationID : ''
}

const userReducer = (state = iState, action) =>{
    console.log(action);
    if(action.type === 'LOGED_USER' || action.type === 'REGISTER_USER'){
        return{
            ...state,
            email: action.payloads.email,
            resourceName: action.payloads.resourceName,
            userId: action.payloads.userId,
            braintreeToken: action.payloads.braintreeToken,
            WCToken: action.payloads.tokn,
            WCTrustedToken: action.payloads.WCTrustedToken,
            personalizationID: action.payloads.personalizationID,   
        } //email, braintreeToken, tokn, userId, WCTrustedToken, personalizationID 
    }
    return state;
    
}

export default userReducer;