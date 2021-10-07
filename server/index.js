require('dotenv').config({ path: '../.env' });

const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const http = require('http');
const mongoose = require('mongoose');

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 4000;
const MONGO_URI = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@cluster0.hdhdz.mongodb.net/" + process.env.MONGO_DB + "?retryWrites=true&w=majority";

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log(`🚀  Connected to MongoDB database at ${process.env.MONGO_DB}`);
	})
	.catch(err => {
		console.log(err);
	});

async function startApolloServer() {	
  const app = express();
  const httpServer = http.createServer(app);
  
  const client = jwksClient({
	  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
	});
	
	function getKey(header, cb){
	  client.getSigningKey(header.kid, function(err, key) {
	    var signingKey = key.publicKey || key.rsaPublicKey;
	    cb(null, signingKey);
	  });
	}
	
	const options = {
	  audience: process.env.CLIENT_ID,
	  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
	  algorithms: ['RS256']
	};
  
  const buildPath = path.join(__dirname, '..', 'build');
	app.use(express.static(buildPath));
	app.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
	});
  
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({ 
	  schema,
	  context: ({ req }) => {
	    const token = req.headers.authorization;
	    const user = new Promise((resolve, reject) => {
	      jwt.verify(token, getKey, options, (err, decoded) => {
	        if(err) {
	          return reject(err);
	        }
	        resolve(decoded.email);
	      });
	    });
	
	    return {
	      user
	    }
	  },
	  plugins: [
		  ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
        		}
      		};
    		}
  		}
  	]
	});
	const subscriptionServer = SubscriptionServer.create({
  	schema,
		execute,
		subscribe,
	}, {
   	server: httpServer,
	 	path: server.graphqlPath,
	});
  
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  
  console.log(`🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  
  return { server, app };
}

startApolloServer();