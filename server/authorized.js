const jwt = require("jsonwebtoken")

const JWT_SECRET = "TOP_SECRET"
const authorizedMiddleware = (req, res, next) => {
  const authorizationToken = req.headers.authorization || ""
  const token = authorizationToken.replace("Bearer ", "")
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403)
      return;
    }
    req.user = user
    next()
  })
}

module.exports = authorizedMiddleware
