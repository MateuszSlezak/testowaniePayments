import axios from "axios";

// Funkcja do wysyłania zapytania POST na podany URL
export const fetchRegisterPayment = async ({ amount, description, email }) => {
  try {
    // URL endpointu
    const url = "https://testowaniepayments.onrender.com/api/payment/donate";
   
  // const url = "https://testowaniebe.onrender.com/api/registerPayment/registerPayment"



    // Dane, które będą przesłane w body
    const payload = {
      amount,
      description,
      email,
    };

    // Wysłanie żądania POST
    const response = await axios.post(url, payload, {
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
