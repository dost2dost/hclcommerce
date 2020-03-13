const iState ={
    userId: '',
    email:  '',
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
            userId: action.payloads.userId,
            braintreeToken: action.payloads.braintreeToken,
            WCToken: action.payloads.tokn,
            WCTrustedToken: action.payloads.WCTrustedToken,
            personalizationID: action.payloads.personalizationID,   
        }
    }
    return state;
}
export default userReducer;