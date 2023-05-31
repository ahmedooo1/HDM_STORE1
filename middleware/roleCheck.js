const User = require('../models/user');

module.exports = (allowedRoles) =>  (req, res, next) => {
    User.findById(req.auth.userId)
      .then(user => {
        if (allowedRoles.includes(user.role)) {
          next();
        } else {
          res.status(403).json({ message: 'Accès refusé' });
        }
      })
      .catch(error => res.status(500).json({ error }));
  };
