require('dotenv').config();

import fs from 'fs';
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

/* connect to the mongoDB */
connectDatabase();

/* auth layer */
const auth = jwt({
    secret: fs.readFileSync(`${__dirname}/ssl/service.key`),
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: (request) => {
        if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
            return request.headers.authorization.split(' ')[1];
        } return null;
    }
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
        return { user: request ? request.user : null };
    },
})

// TODO: GENERATE NEW RSA KEYS

server.applyMiddleware({ app, path: '/graphql' });

app.use((request, response) => {
    response.status(404).send({ message: 'Not found' });
});

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));