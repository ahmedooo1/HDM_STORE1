const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const roleCheck = require('../middleware/roleCheck');
const auth = require('../middleware/auth');
const resetmdp = require('../controllers/sendResetPasswordEmail')

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [LogIn/SignUp]
 *     description: Crée un nouvel utilisateur avec les informations fournies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur dans la requête ou l'utilisateur existe déjà
 */
router.post('/signup', userCtrl.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     tags: [LogIn/SignUp]
 *     description: Authentifie un utilisateur avec l'adresse e-mail et le mot de passe fournis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token d'authentification JWT
 *       401:
 *         description: Authentification échouée
 */
router.post('/login', userCtrl.login);

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Récupère la liste de tous les utilisateurs
 *     tags: [Users]
 *     description: Route pour obtenir la liste de tous les utilisateurs. Nécessite une authentification.
 *     responses:
 *       200:
 *         description: Une liste d'utilisateurs
 */
router.get('/', auth, userCtrl.getUsers);

/**
 * @swagger
 * /auth/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags: [Users]
 *     description: Route pour obtenir un utilisateur avec un ID spécifique. Nécessite une authentification.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'utilisateur avec l'ID spécifié
 */
router.get('/:id', auth, userCtrl.getUser);

/**
 * @swagger
 * /auth/{id}:
 *   put:
 *     summary: Met à jour un utilisateur par son ID
 *     tags: [Users]
 *     description: Route pour mettre à jour un utilisateur avec un ID spécifique. Nécessite une authentification et le rôle 'admin'.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: L'utilisateur mis à jour
 */
router.put('/:id', auth, roleCheck(['admin']), userCtrl.updateUser);

/**
 * @swagger
 * /auth/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID
 *     tags: [Users]
 *     description: Route pour supprimer un utilisateur avec un ID spécifique. Nécessite une authentification et le rôle 'admin'.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'utilisateur supprimé
 */
router.delete('/:id', auth, roleCheck(['admin']), userCtrl.deleteUser);

//reinitialiser le mdp

/**
 * @swagger
 * /auth/mdpOublie:
 *   post:
 *     summary: Envoyer un e-mail de réinitialisation de mot de passe
 *     tags: [Mot de pass oublié et la réinitialisation]
 *     description: Envoyer un e-mail contenant un lien de réinitialisation de mot de passe à l'utilisateur
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Un e-mail de réinitialisation de mot de passe a été envoyé
 */
router.post("/mdpOublie", resetmdp.sendResetPasswordEmail);

/**
 * @swagger
 * /auth/reset/{token}:
 *   get:
 *     summary: Vérifier le jeton de réinitialisation de mot de passe
 *     tags: [Mot de pass oublié et la réinitialisation]
 *     description: Vérifier si le jeton de réinitialisation de mot de passe est valide
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Le jeton de réinitialisation de mot de passe est valide
 */
router.get("/reset/:token", resetmdp.verifyPasswordResetToken);

/**
 * @swagger
 * /auth/reset/{token}:
 *   post:
 *     summary: Mettre à jour le mot de passe de l'utilisateur
 *     tags: [Mot de pass oublié et la réinitialisation]
 *     description: Utiliser un jeton de réinitialisation de mot de passe valide pour mettre à jour le mot de passe de l'utilisateur
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: Le nouveau mot de passe de l'utilisateur
 *                 example: new_password123
 *     responses:
 *       200:
 *         description: Le mot de passe a été mis à jour avec succès
 */
router.post("/reset/:token", resetmdp.updatePassword);


router.post('/search', userCtrl.searchUsers);
module.exports = router;