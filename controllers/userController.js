// Importamos el modelo de Mongo
const User = require("../models/User");
const bcryptService = require("../services/bcryptService");
const userQueue = require("../worker");

// Funcion para obtener todos los Usuarios.

function getAllUsers(req, res) {
  // Utizamos el metodo find() de Mongoose para encontrar TODOS los usuarios.

  User.find()
    .then((users) => res.status(200).json(users)) // Enviamos todos los usuarios como respuesta.
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al obtener usuarios"); // En caso de tener error que envie un mensaje al cliente.
    });
}

// Funcion para crear un nuevo usuario.

function createUser(req, res) {
  // Extraemos toda la informacion del cuerpo de la solicitud.

  const { nombre, edad, email, contraseña } = req.body;
  // Verificar si se proporcionan nombre y edad
  if (!nombre || !edad) {
    return res.status(400).json({ message: "El nombre y la edad son campos obligatorios" });
  }

  // Creamos un nuevo usuario con el metodo create() de mongoose.

  User.create({ nombre, edad, email, contraseña })
    .then((newUser) => res.status(201).json(newUser)) // Enviamos el nuevo usuario como en fomrato Json.;
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al crear Usuario"); // En caso de tener error que envie un mensaje al cliente.
    });
}

// Funcion para actualizar un usuario

function updatedUser(req, res) {
  // Obtenemos el id del usuario a actualizar
  const userId = req.params.id;

  // Obtenemos los datos actualizados del body de la req
  let updatedUserData = req.body;

  // Verificar si se está actualizando la contraseña
  if (updatedUserData.contraseña) {
    // Hashear la nueva contraseña
    bcryptService
      .hashPassword(updatedUserData.contraseña)
      .then((hashedPassword) => {
        // Reemplazar la contraseña sin hashear con la hasheada
        updatedUserData.contraseña = hashedPassword;
        // Actualizar el usuario en la base de datos con la contraseña hasheada
        updateUser(userId, updatedUserData, res);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error al actualizar la contraseña");
      });
  } else {
    // Si no se está actualizando la contraseña, actualizar directamente el usuario en la base de datos
    updateUser(userId, updatedUserData, res);
  }
}

// Función interna para actualizar el usuario en la base de datos
function updateUser(userId, updatedUserData, res) {
  // Utilizamos el método findByIdAndUpdate() de Mongoose para buscar y actualizar el usuario por ID.
  User.findByIdAndUpdate(userId, updatedUserData, { new: true })
    .then((user) => res.status(200).json({ message:   "El usuario " + user.nombre + " a sido actualizado correctamente", user }))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al actualizar el usuario");
    });
}


// Funcion para eliminar un usuario

function deleteUser(req,res){
    // Obtenemos el id del usuario a actualizar.
     const userId = req.params.id;

    // Agregar tarea a la cola
    userQueue.add(userId);
    // Utilizamos el metodo findByIdAndDelete() de Mongoose para buscar y eliminar un usuario por ID.

    User.findByIdAndDelete(userId)
    .then(()=> res.status(200).send("Usuario eliminado correctamente")) // Envaimos una confirmacoin al cliente de que el usuario se elimino correctamente
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error al eliminar el usuario" ); // En caso de tener error que envie un mensaje al cliente.
      });
}

// Exportamos todas las funciones para su uso en otras partes

module.exports={
    createUser,
    deleteUser,
    getAllUsers,
    updatedUser
}