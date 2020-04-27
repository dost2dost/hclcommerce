const appState ={
    baseURL: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`,
    serverBaseURL: 'https://192.168.17.91:8443',
    searchURL : 'http://192.168.17.91:3737/search/',
    wcsURL : 'https://192.168.17.91:5443/wcs/',
    store : '1',
    Catalog: '',

    API : 
        {
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
        preCheckout: 'https://@192.168.17.91:5443/wcs/resources/store/1/cart/@self/precheckout',
        checkout: 'https://192.168.17.91:5443/wcs/resources/store/1/cart/@self/checkout?responseFormat=json',
        orderApi: 'https://192.168.17.91:5443/wcs/resources/store/1/order/'

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