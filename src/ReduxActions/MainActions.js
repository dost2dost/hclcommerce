export const MainActions = (email, braintreeToken, tokn, userId, WCTrustedToken, personalizationID) => {
    return {
        type: 'REGISTER_USER',
        payloads: { email, braintreeToken, tokn, userId, WCTrustedToken, personalizationID }
    }
}