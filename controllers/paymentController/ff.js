import {
  generateFinalizePaymentSign,
  verifyTransaction,
} from "../../services/paymentServices.js";
import { markPaymentAsPaid } from "../../services/dataServices.js";

export const ff = (req, _res) => {
  const { sessionId, orderId, amount } = req.body;
 
  return console.log('req.body', req.body)

//   const sign = generateFinalizePaymentSign(sessionId, orderId, amount);
//   const payment = markPaymentAsPaid(sessionId);

//   verifyTransaction({ sessionId, amount, orderId, sign });

//   console.log("platnosc po sfinalizowaniu:", payment);
};