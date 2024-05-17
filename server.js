// Importamos express  y la conexion a la db.
const express = require("express")
const connectDb = require("./db/db")
const userQueue = require("./worker");

// Creamos una instancia de Express.
// Importamos las rutas
const userRoutes = require("./routes/userRoutes")
const authRoutes= require("./routes/authRoutes")
const sessionRoutes= require("./routes/sessionRoutes")

const app = express()
const PORT= 3010
/* const PORT = process.env.PORT || 3010; */


// Middleware
app.use(express.json()) // Invocamos al middleware para que parsee los datos del body de las solicitudes en formato JSON.

// Rutas de Autenticacion
app.use("/api/auth", authRoutes)

// Rutas de Usuarios
app.use("/api/users", userRoutes) // Creamos las rutas de usuario en la ruta /api/users

// Rutas del usuario actual
app.use("/api/session", sessionRoutes)

// Iniciamos la db.
connectDb()

// Iniciamos el worker de Bull.js con la función de manejo adecuada
userQueue.process(async (job) => {
  try {
    console.log('Procesando tarea:', job.data);   // Realiza aquí las operaciones que deseas realizar con cada tarea

    // Indica que la tarea ha sido completada exitosamente
    return { success: true };
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante el procesamiento de la tarea
    console.error('Error al procesar la tarea:', error);
    // Indica que la tarea ha fallado y se debe reintentar
    throw new Error('Error al procesar la tarea');
  }
});


// Inicializamos el servidor y lo ponemos en escucha en el puerto que pusimos arriba.
app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto: "+ PORT)
})

module.exports = { userQueue };