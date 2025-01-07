import express from 'express'; 
import { createDonate } from '../controllers/paymentController/createDonateController.js';
import { finalizePayment } from '../controllers/paymentController/finalizePayment.js';
import { createRegistrationPayment } from '../controllers/paymentController/createRegistrationPayment.js';

const router = express.Router();

router.post('/registrationPayment/:userId', createRegistrationPayment)
router.post('/donate', createDonate);
router.post('/finalizePayment', finalizePayment);

export default router;