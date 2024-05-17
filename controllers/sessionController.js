const User = require("../models/User");

// Controlador para obtener información sobre el usuario que ha iniciado sesión
function getCurrentUser(req, res) {
    new Promise((resolve, reject) => {
      // El middleware de autenticación (verificarToken) ya habrá almacenado el ID de usuario en req.userId
      const userId = req.userId;
  
      // Busca al usuario en la base de datos utilizando el ID de usuario
      User.findById(userId)
        .then(user => {
          // Verifica si se encontró al usuario
          if (!user) {
            reject({ status: 404, message: 'Usuario no encontrado' });
          } else {
            resolve(user);
          }
        })
        .catch(error => reject({ status: 500, message: 'Error al obtener información del usuario', error }));
    })
      .then(user => res.json(user))
      .catch(error => {
        console.error(error);
        res.status(error.status || 500).json({ message: error.message });
      });
  }

module.exports = {
  getCurrentUser
};
