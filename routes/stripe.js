const express = require('express');
const router = express.Router();
const stripeCtrl = require('../controllers/stripe');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /charge:
 *   post:
 *     summary: Charge la carte avec le montant spécifié
 *     tags: [Stripe]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: tok_1NAdryCCNM9KNgubSGG1FIzh
 *               amount:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       200:
 *         description: Charge effectuée avec succès
 *       400:
 *         description: Paramètres manquants ou invalides
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.post('/charge',auth, stripeCtrl.charge);

module.exports = router;
