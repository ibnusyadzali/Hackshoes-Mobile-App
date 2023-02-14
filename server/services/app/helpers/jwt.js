const jwt = require ('jsonwebtoken')
const key = process.env.JWT_KEY 
function createToken(payload) {
    return jwt.sign(payload,key)
}
function decodeToken(token) {
    return jwt.verify(token,key)
}

module.exports = {createToken, decodeToken}