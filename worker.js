const Queue = require('bull');

// Creamos una nueva cola utilizando Bull
const userQueue = new Queue('userQueue');

// Exportamos la instancia de la cola
module.exports = userQueue;
