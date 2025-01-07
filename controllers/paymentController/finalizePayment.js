import { generateFinalizePaymentSign, verifyTransaction } from '../../services/paymentServices.js'
import { markPaymentAsPaid } from '../../services/dataServices.js'
export const finalizePayment  = (req, res) => {
  const { sessionId, orderId, amount } = req.body;


  console.log('FINALIZE PAYMENT', req.body)
   const sign = generateFinalizePaymentSign(sessionId, orderId, amount)
   console.log('wysłane przez p24:', req.body)
   markPaymentAsPaid(sessionId)

  const payment = verifyTransaction({ sessionId, amount, orderId, sign });  
  console.log('platnosc po sfinalizowaniu:', payment)
}