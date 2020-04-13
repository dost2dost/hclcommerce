export const MainActions = (email, resourceName, braintreeToken, tokn, userId, WCTrustedToken, personalizationID) => {
    return {
        type: 'REGISTER_USER',
        payloads: { email, resourceName, braintreeToken, tokn, userId, WCTrustedToken, personalizationID }
    }
}