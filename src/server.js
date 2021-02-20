require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, } from 'apollo-server-express';

import typeDefs from 'gql/typeDefs';
import resolvers from 'gql/resolvers';

import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import cors from 'cors';

import IsAdminDirective from 'directives/isAdmin';

import connectDatabase from 'connectDatabase';
import verifyToken from './utils/verifyToken';

/* connect to the mongoDB */
connectDatabase();

/* auth layer */
const auth = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    credentialsRequired: false,
    algorithms: ['RS256'],
});

/* create our express app */
const app = express();

/* required by OpenAPI-Express */
const jsonBodyParser = bodyParser.json({});
app.use(jsonBodyParser);

/* enable CORS */
app.use(cors());

/* enable auth on '/graphql' route */
app.use('/graphql', auth);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        isAdmin: IsAdminDirective,
    },
    context: async ({ request }) => {
        console.log({ request });
        return { user: await verifyToken(request) };
    },
})

server.applyMiddleware({ app, path: '/graphql' });

app.use((request, response) => {
    response.status(404).send({ message: 'Not found' });
});

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));