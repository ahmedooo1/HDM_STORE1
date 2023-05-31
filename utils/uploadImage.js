const cloudinary = require('../config/cloudinary-config');

//pour generer les noms des fichiers (perso je prefer les noms originaux)
function generateCustomFilename(file) {
    const name = file.originalname.split('.')[0]; // Récupérer le nom du fichier sans extension
    const customName = name + '_AA'; // Ajouter un suffixe personnalisé
    return customName;
  }
  async function uploadImage(file) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: generateCustomFilename(file),
          folder: 'images', // Optionnel : spécifier un dossier pour stocker les images
        },
        (error, result) => {
          if (error) {
            console.error('Erreur lors de l\'upload de l\'image:', error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
  
      // Envoyer le buffer à Cloudinary
      uploadStream.end(file.buffer);
    });
  }

module.exports = uploadImage;