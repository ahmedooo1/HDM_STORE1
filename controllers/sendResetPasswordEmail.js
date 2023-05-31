const crypto = require("crypto")
const User = require("../models/user");
const transporter = require("../config/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.sendResetPasswordEmail = async (req, res) => {
    try{
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Si l'utilisateur n'est pas trouvé, retourner une erreur
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }
    // Générer un jeton JWT avec l'ID utilisateur et une durée de validité d'une heure
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Stocker le jeton de réinitialisation dans le modèle utilisateur
    user.resetToken = token;
    await user.save();


    const mailOptions = {
      to: user.email,
      from: process.env.MAILER_EMAIL, // Remplacez par votre adresse e-mail
      subject: "Réinitialisation du mot de passe",
      text: `Vous avez demandé la réinitialisation du mot de passe de votre compte.\n\n
             Veuillez cliquer sur le lien suivant, ou copiez-le et collez-le dans votre navigateur pour compléter le processus de réinitialisation du mot de passe :\n\n
             http://${req.headers.host}/api/v1/auth/reset/${token}\n\n
             Si vous n'avez pas demandé de réinitialisation du mot de passe, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "E-mail de réinitialisation envoyé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail de réinitialisation",error: error.message });
  }
};

exports.verifyPasswordResetToken = async (req, res) => {
    try {
      const { token } = req.params;
  
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(400).json({ message: "Invalid or malformed reset token.", error: error.message });
      }
  
      const user = await User.findOne({ _id: decoded.userId, resetToken: token });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired reset token." });
      }
  
      return res.status(200).json({ message: "Valid reset token.", userId: user._id });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
  };
  
  exports.updatePassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
  
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(400).json({ message: "Invalid or malformed reset token.", error: error.message });
      }
  
      const user = await User.findOne({ _id: decoded.userId, resetToken: token });
  
      if (!user) {
        return res.status(404).json({ message: "Invalid or expired reset token." });
      }
      if (!newPassword || newPassword.length === 0) {
        return res.status(400).json({ message: "Le nouveau mot de passe est requis et ne doit pas être vide." });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = undefined; // Clear the resetToken after updating the password
      await user.save();
  
      return res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
  };