const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Send a contact message
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact message sent successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/contact', contactController.sendContactMessage);

module.exports = router;