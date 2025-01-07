import axios from "axios";

// Funkcja do wysyłania zapytania POST na podany URL
export const fetchRegisterPayment = async ({ amount, description, email }) => {
  try {
    // URL endpointu
    //const url = "https://testowaniepayments.onrender.com/api/payment/donate";
    const url = "http://localhost:5000/api/payment/finalizePayment";
   
  // const url = "https://testowaniebe.onrender.com/api/registerPayment/registerPayment"



    // Dane, które będą przesłane w body
    const payload = {
      amount,
      description,
      email,
    };



    const testFinalize = {
        merchantId: 155512,
        posId: 155512,
        sessionId: '76acdf8b-7c22-4230-aefe-254edd16d8b5-1736279137053',
        amount: 410,
        originAmount: 410,
        currency: 'PLN',
        orderId: 1012988,
        methodId: 119,
        statement: 'p24-J9Z-Z6R-J7T',
        sign: 'bdc938fd5435fd6c479bd1ab8d6db7dd8fdb7f95b75fbca6db1b06eab95084643bd769c0f322d0668c8458e40bb4255d'
      }
    

    // Wysłanie żądania POST
    const response = await axios.post(url, testFinalize, {
      headers: {
        "Content-Type": "application/json", // Nagłówek określający format danych
      },
    });

    // Obsługa odpowiedzi
    console.log("Odpowiedź serwera:", response.data);
    return response.data;
  } catch (error) {
    // Obsługa błędów
    console.error("Błąd podczas wykonywania zapytania:");
    if (error.response) {
      console.error("Szczegóły błędu:", error.response.data);
    }
    throw error; // Ponowne rzucenie błędu, jeśli chcesz obsłużyć go wyżej
  }
};

// Wywołanie funkcji (opcjonalne, do testowania)
fetchRegisterPayment({
  amount: 410, // kwota w groszach (np. 1000 groszy = 10 PLN)
  description: "Darowizna na cele charytatywne",
  email: "przyklad@email.com",
});



















































// WERSJA BEZ DANYCH

// import axios from "axios";

// // Funkcja do wysyłania zapytania GET na podany URL
// export const fetchRegisterPayment = async () => {
//   try {
//     // const url = "https://testowaniebe.onrender.com/api/registerPayment/registerPayment";
//     const url = "http://localhost:5000/api/registerPayment/registerPayment";
//     const response = await axios.get(url, {
//       headers: {
//         "Content-Type": "application/json", // Możesz dodać dodatkowe nagłówki jeśli potrzebne
//       },
//     });

//     // Obsługa odpowiedzi
//     console.log("Odpowiedź serwera:", response.data);
//     return response.data;
//   } catch (error) {
//     // Obsługa błędów
//     console.error("Błąd podczas wykonywania zapytania:");
//     if (error.response) {
//       console.error("Szczegóły błędu:", error.response.data);
//     }
//     throw error; // Ponowne rzucenie błędu, jeśli chcesz obsłużyć go wyżej
//   }
// };

// // Wywołanie funkcji (opcjonalne, do testowania)
// fetchRegisterPayment();
