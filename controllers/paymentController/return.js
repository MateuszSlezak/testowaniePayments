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
 // const transactionId = req.params.transactionId;
 // const transaction = findPaymentById(transactionId);
const url = "https://fundacja-hematologiczna.github.io/gala/#/rejestracja";
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

// export const redirectUser = async (req, res) => {
//   try {
//     const transactionId = req.params.transactionId;
//     const transaction = await findPaymentById(transactionId); // Sprawdź, czy funkcja jest asynchroniczna

//     if (!transaction) {
//       return res.redirect(`${url}?status=error`);
//     }

//     const url = transaction.urlReturn;

//     if (transaction.paid) {
//       return res.redirect(`${url}?status=success`);
//     } else {
//       return res.redirect(`${url}?status=failure`);
//     }
//   } catch (error) {
//     console.error("Błąd w redirectUser:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

