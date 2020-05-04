const appState ={
    baseURL: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`,
    serverBaseURL: 'https://192.168.17.91:8443',
    searchURL : 'http://192.168.17.91:3737/search/',
    wcsURL : 'https://192.168.17.91:5443/wcs/',
    store : '1',
    Catalog: '',

    API : 
        {
        mainCategory:   'https://192.168.17.91:5443/wcs/resources/store/1/categoryview/byParentCategory/',
        productByParentCate: 'https://192.168.17.91:5443/wcs/resources/store/1/categoryview/byParentCategory/',
        productById: 'https://192.168.17.91:5443/wcs/resources/store/1/productview/byCategory/',
        guestLogin: 'https://192.168.17.91:5443/wcs/resources/store/1/guestidentity',
        userLogin: 'https://192.168.17.91:5443/wcs/resources/store/1/loginidentity?responseFormat=json',
        userLogout: 'https://192.168.17.91:5443/wcs/resources/store/1/loginidentity/@self',
        newRegistration: 'https://192.168.17.91:5443/wcs/resources/store/1/person',
        searchMenuUrl:'http://192.168.17.91:3737/search/resources/store/1/categoryview/@top?depthAndLimit=*',
        cartDetails: 'https://192.168.17.91:5443/wcs/resources/store/1/cart/@self',
        addToCartUrl: 'https://192.168.17.91:5443/wcs/resources/store/1/cart?responseFormat=json',
        deleteFromCart: 'https://192.168.17.91:5443/wcs/resources/store/1/cart/@self/delete_order_item',
        productViewById: 'https://192.168.17.91:5443/wcs/resources/store/1/productview/byId/',
        autoSuggest: 'http://192.168.17.91:3737/search/resources/store/1/sitecontent/keywordSuggestionsByTerm/',
        billAndShipUserInfo: 'https://192.168.17.91:5443/wcs/resources/store/1/person/@self',
        shippingMethods: 'https://192.168.17.91:5443/wcs/resources/store/1/cart/@self/usable_shipping_info',
        billingMethods: 'https://192.168.17.91:5443/wcs/resources/store/1/cart/@self/usable_payment_info',
        paymentInstructions: 'https://192.168.17.91:5443/wcs/resources/store/1/cart/@self/payment_instruction',
        orderLock: 'https://192.168.17.91:5443/wcs/resources/store/1/cart/',
        preCheckout: 'https://192.168.17.91:5443/wcs/resources/store/1/cart/@self/precheckout',
        checkout: 'https://192.168.17.91:5443/wcs/resources/store/1/cart/@self/checkout?responseFormat=json',
        orderApi: 'https://192.168.17.91:5443/wcs/resources/store/1/order/',
        searchTerm: 'https://192.168.17.91:5443/wcs/resources/store/1/productview/bySearchTerm/'

    }
    
}
// API.guestLogin
//API.registerApi
const appSettings = (getAppSettings = appState, action) =>{
    //console.log(action);
     console.log(window.location.href)
    return getAppSettings;
}
export default appSettings;


// let store = 1;
// let wcsURL = 'https://@192.168.17.91:5443/wcs';
// let searchURL = 'http://192.168.17.91:3737/search';
// appState.API = {
//     mainCategory:   `${wcsURL}/resources/store/${store}/categoryview/byParentCategory/`,
//     productByParentCate: `${wcsURL}/resources/store/${store}/categoryview/byParentCategory/`,
//     productById: `${wcsURL}/resources/store/${store}/productview/byCategory/`,
//     guestLogin: `${wcsURL}/resources/store/${store}/guestidentity`,
//     userLogin: `${wcsURL}/resources/store/${store}/loginidentity?responseFormat=json`,
//     userLogout: `${wcsURL}/resources/store/${store}/loginidentity/@self`,
//     newRegistration: `${wcsURL}/resources/store/${store}/person`,
//     searchMenuUrl:`${searchURL}/resources/store/${store}/categoryview/@top?depthAndLimit=*`,
//     cartDetails: `${wcsURL}/resources/store/${store}/cart/@self`,
//     addToCartUrl: `${wcsURL}/resources/store/${store}/cart?responseFormat=json`,
//     deleteFromCart: `${wcsURL}/resources/store/${store}/cart/@self/delete_order_item`,
//     productViewById: `${wcsURL}/resources/store/${store}/productview/byId/`,
//     autoSuggest: `${searchURL}/search/resources/store/${store}/sitecontent/keywordSuggestionsByTerm/`,
//     billAndShipUserInfo: `${wcsURL}/resources/store/${store}/person/@self`,
//     shippingMethods: `${wcsURL}/resources/store/${store}/cart/@self/usable_shipping_info`,
//     billingMethods: `${wcsURL}/resources/store/${store}/cart/@self/usable_payment_info`,
//     paymentInstructions: `${wcsURL}/resources/store/${store}/cart/@self/payment_instruction`,
//     orderLock: `${wcsURL}/resources/store/${store}/cart/`,
//     preCheckout: `${wcsURL}/wcs/resources/store/${store}/cart/@self/precheckout`,
//     checkout: `${wcsURL}/resources/store/${store}/cart/@self/checkout?responseFormat=json`,
//     orderApi: `${wcsURL}/resources/store/${store}/order/`,

// }