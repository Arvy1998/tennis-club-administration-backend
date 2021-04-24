/**
 * @class PaymentFailed
 * Error for failed payment and authorization with Stripe API.
 * @extends Error
 */
 class PaymentFailed extends Error {
    constructor() {
      super('Payment error...');
    }
  }
  
  export default PaymentFailed;
  