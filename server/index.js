require('dotenv').config();

const express = require('express');
const expressJwt = require('express-jwt');
const http = require('http');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = 4000;
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
  
  app.use(
	  expressJwt({
		  secret: process.env.JWT_SECRET,
		  algorithms: ["HS256"],
		  credentialsRequired: false
	  })
  );
  
  const server = new ApolloServer({ 
	  typeDefs, 
	  resolvers,
	  context: ({ req }) => {
		  const user = req.user || null;
		  return { user };
	  },
	  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] 
	});
  
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  
  console.log(`🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  
  return { server, app };
}

startApolloServer();