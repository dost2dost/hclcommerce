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
        userLogin: 'https://192.168.17.91:5443/wcs/resources/store/11901/loginidentity/@self',
        userLogout: 'https://192.168.7.167/wcs/resources/store/1/loginidentity/@self',
        searchMenuUrl:'http://192.168.17.91:3737/search/resources/store/1/categoryview/@top?depthAndLimit=*',
        addToCartUrl: 'https://192.168.17.91:5443/wcs/resources/store/1/cart?responseFormat=json',
        deleteFromCart: 'https://192.168.17.91:5443/wcs/resources/store/1/cart/@self/delete_order_item',
        productViewById: 'https://192.168.17.91:5443/wcs/resources/store/1/productview/byId/',
        autoSuggest: 'http://192.168.17.91:3737/search/resources/store/1/sitecontent/keywordSuggestionsByTerm/'    
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