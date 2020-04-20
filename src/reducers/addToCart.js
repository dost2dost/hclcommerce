import { MainActions } from "../ReduxActions/MainActions";

const iState ={
    products: [],
    orderId: '',
    subTotal: 0,
    cartQuantity: 0
}

const addToCart = (state = iState, action) =>{
   // console.log(state.products)
    if(action.type === 'ADD_CART'){
        return{
            ...state, 
            products : [...state.products, action.payloads.productDetails],
            orderId: action.payloads.orderId,//parseFloat(state.cart) + parseFloat(action.payloads.inCart),
            subTotal: (parseFloat(state.subTotal) + (parseFloat(action.payloads.productDetails.Price) * parseFloat(action.payloads.productDetails.quantity))).toFixed(2),
            cartQuantity: state.cartQuantity + parseInt(action.payloads.productDetails.quantity)
        }
    }
    let counter = 0
    let getIndex = ''
    if(action.type === 'REMOVE_FROM_CART'){
        state.products.map((item, index)=> {
            if(item.orderItemId === action.payloads.removeProduct.orderItemId){
                getIndex = index;
            }
        })
        let outcome = state.products
        outcome.splice(getIndex, 1)
        return{
            ...state, 
            products : outcome,
            orderId : action.payloads.orderId,
            subTotal: (parseFloat(state.subTotal) - (parseFloat(action.payloads.removeProduct.Price) * parseFloat(action.payloads.removeProduct.quantity))).toFixed(2),
            cartQuantity: state.cartQuantity - parseInt(action.payloads.removeProduct.quantity)
            
        }
    }
    
    if(action.type === 'UPDATE_CART'){
        state.products.map((item, index)=> {
            if(item.orderItemId === action.payloads.updateProduct.orderItemId){
                getIndex = index;
            }
        })
        let outcome = state.products        
        let quantiytDifference =  parseInt(action.payloads.updateProduct.quantity) - parseInt(outcome[getIndex].quantity)
        outcome[getIndex].quantity = action.payloads.updateProduct.quantity 
        return {
            ...state,
            products: outcome,
            orderId : action.payloads.orderId,
            subTotal: (parseFloat(state.subTotal) + (parseFloat(action.payloads.updateProduct.Price) * parseFloat(quantiytDifference))).toFixed(2),
            cartQuantity: state.cartQuantity + quantiytDifference
        }
    }
    return state;
    
}

export default addToCart;