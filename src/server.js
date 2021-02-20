import { ApolloServer } from 'apollo-server';

import typeDefs from 'gql/typeDefs';
import resolvers from 'gql/resolvers';

import connectDatabase from 'connectDatabase';

/* connect to the mongoDB */
connectDatabase();

const server = new ApolloServer({ typeDefs, resolvers });

/* The `listen` method launches a web server */
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
