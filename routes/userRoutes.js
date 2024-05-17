
/* 'use strict' */
const express = require("express")// Importamos express y creamos un router.
const router = express.Router()
const {redisCache, UserCacheget} = require('../redis')//Redis


// Importamos el controlador de usuarios.
const userController = require("../controllers/userController")


// Definir las rutas para el CRUD de usuarios.

router.get("/",userController.getAllUsers) // Ruta para obtener todos los usuarios
router.post("/",userController.createUser) // Ruta para crear un usuario
router.put("/:id", userController.updatedUser) // Ruta para actualizar un usuario
router.delete("/:id", userController.deleteUser) // Ruta para eliminar un usuario

module.exports= router