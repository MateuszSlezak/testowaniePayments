import { findPaymentById } from "../../services/dataServices.js";

// export const redirectUser = (req, res) => {
//     const transactionId = req.params.transactionId;
//     const transaction = findPaymentById(transactionId);

//     if (!transaction) {
//         res.redirect(`${url}?status=error`);
//     }

//      const url = transaction.urlReturn
  
//     if (transaction.paid) {
//       res.redirect(`${url}?status=success`);
//     } else {
//       res.redirect(`${url}?status=failure`);
//     }
//   };


export const redirectUser = (req, res) => {
  const transactionId = req.params.transactionId;
  const transaction = findPaymentById(transactionId);

  res.redirect(`${url}`)

  // if (!transaction) {
  //     res.redirect(`${url}?status=error`);
  // }

  //  const url = transaction.urlReturn

  // if (transaction.paid) {
  //   res.redirect(`${url}?status=success`);
  // } else {
  //   res.redirect(`${url}?status=failure`);
  // }
};

