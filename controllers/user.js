const bcrypt = require('bcrypt');
const User = require('../models/user')
const jwt = require('jsonwebtoken')



exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
            name : req.body.name,
          email: req.body.email,
          password: hash,
          
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };



 exports.getUsers = (req, res, next) => {
    User.find()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
  } 
  exports.getUser = (req, res, next) => {
    User.findById(req.params.id)
      .then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({ error }));
  }
 exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true})
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).json(err));
  };



  exports.deleteUser = (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
      .catch(error => res.status(400).json({ error }));
  }

  exports.searchUsers = (req, res) => {
    const searchTerm = req.body.searchTerm;
    const role = req.body.role;
    
    User.find({ 
      $or: [
        { $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } } 
        ] },
        { role: role }
      ] 
    })
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err)); 
  };
