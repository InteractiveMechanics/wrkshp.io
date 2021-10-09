require('dotenv').config();

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const verifyToken = async function(bearerToken) {
	const client = jwksClient({
	  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
	});
	
	function getJwksClientKey(header, callback){
	  client.getSigningKey(header.kid, function(err, key) {
	    var signingKey = key.publicKey || key.rsaPublicKey;
	    callback(null, signingKey);
	  });
	}
	
	const options = {
	  audience: process.env.AUDIENCE,
	  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
	  algorithms: ['RS256']
	};
	
	return new Promise((resolve, reject) => {
		jwt.verify(bearerToken, getJwksClientKey, options, 
			function (err, decoded) {
	      if(err) reject(err);
	      resolve(decoded);
    });
	})
}  
  
module.exports = { verifyToken };