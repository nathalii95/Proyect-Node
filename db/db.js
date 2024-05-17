// Importamos Mongoose para crear la conexion a la base de datos de MONGODB.
const mongoose = require("mongoose");

// Establecemos nuestra url de la base de datos == DB
const mongoDBURL = "mongodb+srv://nathalyuvidia:Hsm199525@cluster0.hlglhlv.mongodb.net/proyect";

// Funcion para conectarnos a la DB
function connectDB() {
    return new Promise((res, rej) => {
      // Conectar a la base de datos usando la URL proporcioanada
      mongoose
        .connect(mongoDBURL)
        .then(() => {
          console.log("Conexion a la DB establecida correctamente");
          // Si la conexion es exitosa resolvemos la promesa-
          res();
        })
        .catch((err) => {
          // Si hay un error al conectar, imprimir el error y rechazar la promesa
          console.error("Error al conectar a la DB ", err);
          rej(err);
        });
    });
  }
  
  //Exportamos la funcion de la conexion a la base de datos para poder utilizarla en el app.js
  module.exports = connectDB;
  