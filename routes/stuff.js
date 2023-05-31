const express = require('express');
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/Stuff');
const multer = require('../config/multer-config');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

/**
 * @swagger
 * /stuff/{id}:
 *   put:
 *     summary: Met à jour un objet par son ID
 *     tags: [Stuff]
 *     description: Route pour mettre à jour un objet avec un ID spécifique. Nécessite une authentification et le rôle 'admin'.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: L'objet mis à jour
 */
router.post('/', auth, roleCheck(['admin', 'redacteur']), multer, stuffCtrl.createThing);

/**
 * @swagger
 * /stuff/{id}:
 *   get:
 *     summary: Récupère un objet par son ID
 *     tags: [Stuff]
 *     description: Route pour récupérer un objet avec un ID spécifique. Nécessite une authentification.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'objet avec l'ID spécifié
 */
router.get('/:id', auth, stuffCtrl.getOneThing);

/**
 * @swagger
 * /stuff/{id}:
 *   put:
 *     summary: Met à jour un objet par son ID
 *     tags: [Stuff]
 *     description: Route pour mettre à jour un objet avec un ID spécifique. Nécessite une authentification et le rôle 'admin'.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: L'objet mis à jour
 */
router.put('/:id', auth, roleCheck(['admin', 'redacteur']), multer, stuffCtrl.modifyThing);

/**
 * @swagger
 * /stuff/{id}:
 *   delete:
 *     summary: Supprime un objet par son ID
 *     tags: [Stuff]
 *     description: Route pour supprimer un objet avec un ID spécifique. Nécessite une authentification.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'objet supprimé
 */
router.delete('/:id', auth,roleCheck(['admin', 'redacteur']), stuffCtrl.deleteThing);

/**
 * @swagger
 * /stuff:
 *   get:
 *     summary: Récupère la liste de tous les objets
 *     tags: [Stuff]
 *     description: Route pour récupérer la liste de tous les objets
 *     responses:
 *       200:
 *         description: Une liste d'objets
 */
router.get('/', stuffCtrl.getThings);

module.exports = router;