const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const roleCheck = require('../middleware/roleCheck');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Créer une catégorie. Nécessite une authentification et le rôle 'admin'.
 *     tags: [Catégories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom de la catégorie
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       400:
 *         description: Requête invalide
 */
router.post('/categories',auth,roleCheck(['admin']), categoryController.createCategory);

/**
 * @swagger
 * /subcategories:
 *   post:
 *     summary: Créer une sous-catégorie. Nécessite une authentification et le rôle 'admin'.
 *     tags: [Catégories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom de la sous-catégorie
 *               categoryId:
 *                 type: string
 *                 description: L'ID de la catégorie parente
 *     responses:
 *       201:
 *         description: Sous-catégorie créée avec succès
 *       400:
 *         description: Requête invalide
 */
router.post('/subcategories',auth,roleCheck(['admin']), categoryController.createSubCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Récupérer la liste des catégories
 *     tags: [Catégories]
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès
 *       400:
 *         description: Requête invalide
 */
router.get('/categories', categoryController.getCategories);

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Récupérer une catégorie par son ID
 *     tags: [Catégories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la catégorie à récupérer
 *     responses:
 *       200:
 *         description: Catégorie récupérée avec succès
 *       404:
 *         description: Catégorie introuvable
 *       500:
 *         description: Erreur lors de la récupération de la catégorie
 */
router.get('/categories/:categoryId', categoryController.getCategoryById);

/**
 * @swagger
 * /categories/{categoryId}:
 *   put:
 *     summary: Mettre à jour une catégorie. Nécessite une authentification et le rôle 'admin'.
 *     tags: [Catégories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la catégorie à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nouveau nom de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Catégorie introuvable
 *       500:
 *         description: Erreur lors de la mise à jour de la catégorie
 */
router.put('/categories/:categoryId',auth,roleCheck(['admin']), categoryController.updateCategory);

/**
 * @swagger
 * /categories/{categoryId}:
 *   delete:
 *     summary: Supprimer une catégorie. Nécessite une authentification et le rôle 'admin'.
 *     tags: [Catégories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la catégorie à supprimer
 *     responses:
 *       200:
 *         description: Catégorie supprimée avec succès
 *       404:
 *         description: Catégorie introuvable
 *       500:
 *         description: Erreur lors de la suppression de la catégorie
 */
router.delete('/categories/:categoryId',auth,roleCheck(['admin']), categoryController.deleteCategory);

/**
 * @swagger
 * /subcategories:
 *   get:
 *     summary: Récupérer la liste des sous-catégories
 *     tags: [Catégories]
 *     responses:
 *       200:
 *         description: Liste des sous-catégories récupérée avec succès
 *       400:
 *         description: Requête invalide
 */
router.get('/subcategories', categoryController.getSubCategories);

module.exports = router;