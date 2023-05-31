const Thing = require('../models/thing');
const fs = require('fs');
const uploadImage = require('../utils/uploadImage');
const cloudinary = require('../config/cloudinary-config');
exports.createThing = async (req, res, next) => {
    const thingObject = req.body;
    delete thingObject._id;
    delete thingObject._userId;
  
    let imageUrl;
  
    if (req.file) {
      imageUrl = await uploadImage(req.file);
      if (!imageUrl) {
        return res.status(400).json({ error: 'Erreur lors de l\'upload de l\'image !' });
      }
    } else {
      imageUrl = '/images/default.jpg';
    }
  
    const thing = new Thing({
      ...thingObject,
      userId: req.auth.userId,
      imageUrl,
    });
  
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
      .catch(error => res.status(400).json({ error }));
  };
exports.modifyThing = async (req, res, next) => {
    try {
        const thing = await Thing.findOne({ _id: req.params.id });

        if (!thing) {
            return res.status(404).json({ error: "L'objet n'existe pas" });
        }

        // if (thing.userId != req.auth.userId) {
        //     return res.status(401).json({ message: 'Not authorized' });
        // }

        const thingObject = req.body;
        delete thingObject._id;
        delete thingObject._userId;

        let imageUrl = thing.imageUrl;

        if (req.file) {
            imageUrl = await uploadImage(req.file);
            if (!imageUrl) {
                return res.status(400).json({ error: 'Erreur lors de l\'upload de l\'image !' });
            }
        }

        const updatedThing = {
            ...thing.toObject(),
            ...thingObject,
            imageUrl,
        };

        await Thing.updateOne({ _id: req.params.id }, updatedThing);

        res.status(200).json({ message: 'Objet modifié !' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id})
      .then(thing => {
          if (thing.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = thing.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Thing.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};
  exports.getOneThing =  (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  };
  exports.getThings =  (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  };

