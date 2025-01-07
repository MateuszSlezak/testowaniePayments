
import express from 'express'; 
import { registerParticipant } from '../controllers/registerParticipantController.js'; 


const router = express.Router();

router.post('/registerUser', registerParticipant);

export default router; 