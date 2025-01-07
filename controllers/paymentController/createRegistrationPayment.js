import { createPaymentForUser } from "../../services/paymentServices.js";

export const createRegistrationPayment = async (req, res) => {
  const userId = req.query.id;
    try {
      const payment = createPaymentForUser(userId);
  
      if (payment.success) {
        
        res.redirect(payment.url);
      } else {
        res.status(400).json({ message: "Błąd podczas tworzenia transakcji", error: result.error });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };