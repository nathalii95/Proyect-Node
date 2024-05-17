const crypto = require("crypto")

const secret = crypto.randomBytes(32).toString("hex")

console.log(secret) // cb39c24ee4bf9d2de717aa56476e3830856ae35100d9b89bd5dbce7f1810fa22