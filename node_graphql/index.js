const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define your GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Define your GraphQL resolvers
const rootValue = {
    hello: () => 'Hello World!'
};

// Create an Express app
const app = express();

// Add GraphQL middleware to your Express app
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true // Enable the GraphiQL UI for testing and exploration
}));

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
