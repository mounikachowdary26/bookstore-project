import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all orders for a user
router.get('/', auth, async (req, res) => {
    try {
        res.json({ message: "Orders route working" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 