const jwt = require("jsonwebtoken");

// Almacenamos nuestra clave secreta

const JWT_SECRET = "cb39c24ee4bf9d2de717aa56476e3830856ae35100d9b89bd5dbce7f1810fa22";

//como se crea clave secreta en helpers

// Creamos una funcion para generar un token JWT

function generateToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return token //se retorna para que devuelva todo lo se se hizo ahi dentro
}

module.exports= {
    generateToken
}

