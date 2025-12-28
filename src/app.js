require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const connectDB = require('./config/db');
const routes = require('./routes');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (landing page)
app.use(express.static(path.join(__dirname, '../public')));

// REST API routes
app.use('/api', routes);

// Also serve routes without /api prefix (like JSONPlaceholder)
app.use('/', routes);

// Initialize Apollo Server and start
async function startServer() {
  // Connect to MongoDB
  await connectDB();

  // Create Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable introspection for playground
  });

  await apolloServer.start();

  // Apply Apollo middleware
  app.use('/graphql', expressMiddleware(apolloServer));

  // Root route - serve landing page
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🔥 OnlyDevs API is running!                            ║
║                                                           ║
║   REST API:    http://localhost:${PORT}/users              ║
║   GraphQL:     http://localhost:${PORT}/graphql            ║
║   Docs:        http://localhost:${PORT}                    ║
║                                                           ║
║   Made with ❤️  by Sayed Abdul Karim                       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
  });
}

startServer().catch(console.error);
