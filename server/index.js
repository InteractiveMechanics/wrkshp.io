require('dotenv').config();

const path = require('path');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const webSocketServer = require('websocket').server;

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { verifyToken } = require('./verifyToken');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { User } = require('./models/user');

const PORT = process.env.PORT || 4000;
const WS_PORT = 8000;
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

  const buildPath = path.join(__dirname, '..', 'build');
	app.use(express.static(buildPath));
	app.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
	});
  
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({ 
	  schema,
	  context: async ({ req }) => {
		  let isAuth = false;
		  let user = null;
		  
		  try {
			  const authHeader = req.headers.authorization || "";
			  const userHeader = req.headers.user || "";
			  if (authHeader) {
				  const token = authHeader.split(" ")[1];
				  const payload = await verifyToken(token);
				  
				  isAuth = payload && payload.sub ? true : false;
					if (isAuth) {
						if (userHeader) {
							user = await User.findOne({ "email": userHeader });
						}
					}				  
			  }
		  } catch(error) {
			  console.error(error);
		  }
		  
		  return { isAuth, user };
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

function startWebSocketServer() {
	const httpServer = http.createServer();
	
	httpServer.listen(WS_PORT);
	const wsServer = new webSocketServer({
	  httpServer: httpServer
	});

	console.log(`🚀  WebSocket Server ready at http://localhost:${PORT}`);
}

startApolloServer();
//startWebSocketServer();