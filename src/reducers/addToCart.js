import { MainActions } from "../ReduxActions/MainActions";

const iState ={
    products: [],
    orderId: '',
    subTotal: 0,
    cartQuantity: 0,
    totalValue: 0,
    grandTotal: 0,
    discount: 0,

    shippingMethod: '',
    billingMethod: '',
    addressId: '',
    addCountry: '',
    piId: '',
    billAndShipAddDetails: '',

    orderComplete: ''
}

const addToCart = (state = iState, action) =>{
    //console.log(state)
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

    if(action.type === 'CART_DETAILS'){ //total, grandTotal, discount
        return{
            ...state,
            totalValue: action.payloads.total,
            grandTotal: action.payloads.grandTotal,
            discount: action.payloads.discount
        }
    }
    if(action.type === 'OTHER_CART_DETAILS'){
        console.log(action.payloads.shippingAddDetails+'---'+action.payloads.billingAddDetails)
        return{ //shippingAddDetails, billingAddDetails, addressId, addCountry, piId, orderId
            ...state,
            billAndShipAddDetails: action.payloads.billAndShipAddDetails,
            shippingMethod: action.payloads.shippingAddDetails,
            billingMethod: action.payloads.billingAddDetails,
            addressId: action.payloads.addressId,
            addCountry: action.payloads.addCountry,
            piId: action.payloads.piId,
            orderId: action.payloads.orderId,
        }
    }
    if(action.type === 'ORDER_COMPLETE'){
        let orderComplete = state.products
        console.log(orderComplete)
        return{
            ...state,
            piId: orderComplete, 
            cartQuantity: 0,  
        }
    }
    if(action.type === 'EMPTY_CART'){
        return{
            products: [],
            orderId: '',
            subTotal: 0,
            cartQuantity: 0,
            totalValue: 0,
            grandTotal: 0,
            discount: 0,

            shippingMethod: '',
            billingMethod: '',
            addressId: '',
            addCountry: '',
            piId: '',
            billAndShipAddDetails: ''
        }
    }
    return state;
    
}

export default addToCart;