// Importamos express y creamos un router.

const express = require("express");
const router = express.Router();

// Importamos el controlador de authRoutes.

const authController = require("../controllers/authController");

// Imoprtamos el middleware de Seguridad

const verifyToken= require("../middleware/verifyToken")

// Rutas para al Auth del User.

router.post("/login", authController.login);

// Ruta para cerrar Sesion

router.post("/logout", verifyToken, authController.logout);

/* router.get("/logout", authController.logout); */

module.exports = router;
