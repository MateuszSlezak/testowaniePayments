import fs from "fs";

const PAYMENTS_FILE = "./data/payments.json";
const USERS_FILE = "./data/users.json";

export const readData = (file) => {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
};

export const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

export const findPaymentsForUser = (userId) => {
  const payments = readData(PAYMENTS_FILE);
  return payments.find((payment) => payment.userId === userId) || null;
};

export const findPaymentById = (paymentId) => {
  const payments = readData(PAYMENTS_FILE);
  return payments.find((payment) => payment.id === paymentId) || null;
}

export const addPayment = (payment) => {
  const payments = readData(PAYMENTS_FILE);
  payments.push(payment);
  writeData(PAYMENTS_FILE, payments);
};

export const findUserById = (userId) => {
  const users = readData(USERS_FILE);
  return users.find((user) => user.id === userId) || null;
};

export const markPaymentAsPaid = (paymentId) => {
  let payments = readData(PAYMENTS_FILE);

  const paymentIndex = payments.findIndex(
    (payment) => payment.id === paymentId
  );
  if (paymentIndex === -1) {
    console.error("Nie znaleziono płatności o podanym ID");
    return null;
  }

  payments[paymentIndex].paid = true;
  writeData(PAYMENTS_FILE, payments);

  return payments[paymentIndex];
};
