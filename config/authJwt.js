var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  console.log("hi there auth");
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      {
        url: /\/api\/v1\/register(.*)/,
        methods: ["GET", "OPTIONS", "POST", "PUT"],
      },

      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    return true;
  }
}
module.exports = authJwt;
