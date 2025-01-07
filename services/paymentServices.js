import axios from "axios";
import crypto from "crypto";
import { findUserById , addPayment } from "./dataServices.js";
import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
  API_URL: process.env.API_URL,
  CRC_KEY: process.env.CRC_KEY,
  MERCHANT_ID: process.env.MERCHANT_ID,
  REPORT_KEY: process.env.REPORT_KEY,
  URL: process.env.URL,
};

const { API_URL, CRC_KEY, MERCHANT_ID, REPORT_KEY, URL } = CONFIG;

const basicAuth = Buffer.from(`${MERCHANT_ID}:${REPORT_KEY}`).toString("base64");

export const createSessionId = () => {
  const uuid = crypto.randomUUID(); 
  const timestamp = Date.now();    
  return `${uuid}-${timestamp}`;  
}

export const generateRegisterSign = (sessionId, amount) => {
  const checkSum = `{"sessionId":"${sessionId}","merchantId":${MERCHANT_ID},"amount":${amount},"currency":"PLN","crc":"${CRC_KEY}"}`;
  return crypto.createHash("sha384").update(checkSum).digest("hex");
};

export const generateFinalizePaymentSign = (sessionId, orderId, amount) => {
  const params = {
    sessionId, 
    orderId, 
    amount, 
    currency: "PLN", 
    crc: CRC_KEY 
  };
  
  const combinedString = JSON.stringify(params);
  const hash = crypto.createHash('sha384').update(combinedString).digest('hex');

  return hash
}


export const createPaymentForUser = async ({ userId }) => {
 // console.log("Dane przekazywane do createTransaction:", { sessionId, amount, description, email });
  try {
    const sessionId = createSessionId();
    const sign = generateRegisterSign(sessionId, 10000);
    const user = findUserById(userId);
    
    
    const payload = {
      merchantId: MERCHANT_ID,
      posId: MERCHANT_ID, 
      sessionId,
      amount: 10000,
      currency: "PLN",
      description: "opłata rejestracyjna Gala ",
      email: user.email,
      country: "PL",
      language: "pl",
      urlReturn: "https://sandbox.przelewy24.pl/api/v1",
      sign: sign,
      urlStatus: `${URL}/api/payment/finalizePayment`
    };

    const response = await axios.post(`${API_URL}/transaction/register`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`, 
      },
    });
    if (response.data && response.data.data) {
      console.log("Transakcja utworzona pomyślnie:", response.data);

      const payment = {
        id:sessionId, 
        title:'gala registration', 
        amount, token:response.data.data.token,
        userId, 
        paid:false,
      }
       
      addPayment(payment);
     
      console.log('userData:', payload, 'token:', response.data.data.token, 'url:', 
        `https://sandbox.przelewy24.pl/trnRequest/${response.data.data.token}`)

      return {
        success: true,
        token: response.data.data.token,
        url: `https://sandbox.przelewy24.pl/trnRequest/${response.data.data.token}`,
      };
    } else {
      console.error("Błąd w odpowiedzi od Przelewy24:", response.data);
      return { success: false, error: "Nieoczekiwany błąd serwera Przelewy24." };
    }
  } catch (error) {
    console.error("Błąd podczas tworzenia transakcji---:", error.message);
    if (error.response) {
      console.error("Szczegóły błędu:", error.response.data);
    }
     return { success: false, error: error.message };
   }
};


export const createTransaction = async ({ sessionId, amount, description, email }) => {
  console.log("Dane przekazywane do createTransaction:", { sessionId, amount, description, email });
  try {
    const sign = generateRegisterSign(sessionId, amount);
    console.log(API_URL, CRC_KEY, MERCHANT_ID, REPORT_KEY, URL)

    const payload = {
      merchantId: MERCHANT_ID,
      posId: MERCHANT_ID, 
      sessionId,
      amount,
      currency: "PLN",
      description,
      email,
      country: "PL",
      language: "pl",
      urlReturn: "https://sandbox.przelewy24.pl/api/v1",
      sign: sign,
      urlStatus: `${URL}/api/payment/finalizePayment`
    };

    console.log(`${API_URL}/transaction/register`)

    const response = await axios.post(`${API_URL}/transaction/register`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`, 
      },
    });
    if (response.data && response.data.data) {
      console.log("Transakcja utworzona pomyślnie:", response.data);

      const payment = {
        id:sessionId, 
        title:'donate', 
        amount, 
        token:response.data.data.token,
        paid:false,
      }
       
      addPayment(payment);
     
      // console.log('userData:', payload, 'token:', response.data.data.token, 'url:', 
      //   `https://sandbox.przelewy24.pl/trnRequest/${response.data.data.token}` )

      return {
        success: true,
        token: response.data.data.token,
        url: `https://sandbox.przelewy24.pl/trnRequest/${response.data.data.token}`,
      };
    } else {
      console.error("Błąd w odpowiedzi od Przelewy24:", response.data);
      return { success: false, error: "Nieoczekiwany błąd serwera Przelewy24." };
    }
  } catch (error) {
    console.error("Błąd podczas tworzenia transakcji:", error.message);
    if (error.response) {
      console.error("Szczegóły błędu:", error.response.data);
    }
     return { success: false, error: error.message };
   }
};




export const verifyTransaction = async ({ sessionId, amount, orderId, sign }) => {
  try {
    const payload = {
    merchantId: MERCHANT_ID,
    posId: MERCHANT_ID, 
    sessionId: sessionId,
    amount: amount,
    currency: "PLN",
    orderId,
    sign: sign,
    };

    const response = await axios.put(`${API_URL}/transaction/verify`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`, 
      },
    });

    if (response.data && response.data.data) {
      console.log("Transakcja zweryfikowana:", response.data);
      console.log('userData:', payload, 'token:', response.data.data.token)
      return {
        success: true,
        token: response.data.data.token,
        url: `https://sandbox.przelewy24.pl/trnRequest/${response.data.data.token}`,
      };
    } else {
      console.error("Błąd w odpowiedzi od Przelewy24:", response.data);
      return { success: false, error: "Nieoczekiwany błąd serwera Przelewy24." };
    }
  } catch (error) {
    console.error("Błąd podczas tworzenia transakcji:", error.message);
    if (error.response) {
      console.error("Szczegóły błędu:", error.response.data);
    }
     return { success: false, error: error.message };
   }
};
