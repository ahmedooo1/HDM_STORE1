const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Créer un commentaire
 *     tags: [Commentaires]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               content:
 *                 type: string
 *                 description: Le contenu du commentaire
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Accès non autorisé
 */
router.post('/comments', auth, commentController.createComment);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Récupérer la liste des commentaires
 *     tags: [Commentaires]
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès
 *       400:
 *         description: Requête invalide
 */
router.get('/comments', commentController.getComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Récupérer un commentaire par son ID
 *     tags: [Commentaires]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire
 *     responses:
 *       200:
 *         description: Commentaire récupéré avec succès
 *       404:
 *         description: Commentaire introuvable
 *       401:
 *         description: Accès non autorisé
 */
router.get('/comments/:id', auth, commentController.getComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Mettre à jour un commentaire par son ID
 *     tags: [Commentaires]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               content:
 *                 type: string
 *                 description: Le contenu du commentaire
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *       404:
 *         description: Commentaire introuvable
 *       401:
 *         description: Accès non autorisé
 *       403:
 *         description: Accès refusé
 */
router.put('/comments/:id', auth, roleCheck('admin'), commentController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Supprimer un commentaire par son ID
 *     tags: [Commentaires]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       404:
 *         description: Commentaire introuvable
 *       401:
 *         description: Accès non autorisé
 *       403:
 *         description: Accès refusé
 */
router.delete('/comments/:id',auth, roleCheck('admin'), commentController.deleteComment);

module.exports = router;