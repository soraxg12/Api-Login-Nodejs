const jwt = require("jsonwebtoken");
const { authSecret } = require('../../.env')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: "No token provided" });
    }
    const [scheme, token] = authHeader.split(" ");

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: "No token provided" });
    }

    try {
        var decoded = jwt.verify(token,authSecret);
        req.id = decoded.id;
  
          return next();
      } catch(err) {
        return res.status(401).send({ error: "Token invalid",err });
      }
}