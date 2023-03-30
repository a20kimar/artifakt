const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const schema = makeExecutableSchema({ typeDefs, resolvers })
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
