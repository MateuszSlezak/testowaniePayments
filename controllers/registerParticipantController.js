import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { createTransaction, createSessionId } from '../services/paymentServices.js'

const USERS_FILE = './data/users.json';
const PAYMENTS_FILE = './data/payments.json';

const readData = (file) => {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

export const registerParticipant = async (req, res) => {
  try {
    const { name, email, street, buildingNumber, zipCode, city } = req.body;
    console.log('Operation started demo');
    console.log('body z frontendu:', req.body)

    let users = fs.existsSync(USERS_FILE) ? readData(USERS_FILE) : [];
    let payments = fs.existsSync(PAYMENTS_FILE) ? readData(PAYMENTS_FILE) : [];

    if (users.some((user) => user.email === email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const id = uuidv4();
    const registrationDate = new Date().toISOString().slice(0, 10);
    const sessionId = await createSessionId();
    const result = await createTransaction({ sessionId, amount:10000, description:'Opłata rejestracyjna gala', email });

    if (result.success) {
      const user = {id, name, email, street, buildingNumber, zipCode, city, registrationDate , transactionId:sessionId};
      users.push(user);
      const payment = {id:sessionId, title:'registration', amount:10000, token:result.token, url:result.url, paid:false,}
      payments.push(payment)
  
      writeData(USERS_FILE, users);
      writeData(PAYMENTS_FILE, payments);
  
      res.status(201).json({ message: "Rejestracja zakończona pomyślnie", url: result.url });
    } else {
      res.status(400).json({ message: "Błąd podczas tworzenia transakcji", error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};