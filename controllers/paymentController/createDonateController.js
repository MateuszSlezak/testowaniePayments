import { createTransaction, createSessionId } from "../../services/paymentServices.js";

export const createDonate = async (req, res) => {
  try {
    const { amount, description, email } = req.body;
    const sessionId = await createSessionId();
    const result = await createTransaction({ sessionId, amount, description, email });

    if (result.success) {
      res.status(201).json({ message: "Transakcja utworzona pomyślnie", url: result.url });
    } else {
      res.status(400).json({ message: "Błąd podczas tworzenia transakcji", error: result.error });
    }
  } catch (error) {
    res.status(500).json({ message: "Wewnętrzny błąd serwera", error: error.message });
  }
};