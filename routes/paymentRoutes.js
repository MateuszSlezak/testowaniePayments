import express from 'express'; 
import { createDonate } from '../controllers/paymentController/createDonateController.js';
import { finalizePayment } from '../controllers/paymentController/finalizePayment.js';
import { createRegistrationPayment } from '../controllers/paymentController/createRegistrationPayment.js';
//import { ff } from '../controllers/paymentController/ff.js';
import { redirectUser } from '../controllers/paymentController/return.js';

const router = express.Router();

router.post('/registrationPayment/:userId', createRegistrationPayment)
router.post('/donate', createDonate);
router.post('/finalizePayment', finalizePayment);
router.get("/return/:transactionId", redirectUser);
  
//router.get('/f', ff);

export default router;