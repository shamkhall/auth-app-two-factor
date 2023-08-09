import express from 'express';
import {config} from "./config/config";
import {ApolloServer} from "apollo-server-express";
import {AuthTypeDef} from "./auth/auth.type-def";
import {AuthResolver} from "./auth/auth.resolver";
import { connect as connectToMongo } from "mongoose";

async function bootstrap() {
    const app = express();
    const server =
        new ApolloServer({typeDefs: AuthTypeDef.typeDef,
            resolvers: AuthResolver.resolver});

    await connectToMongo(config.MONGO_CONNECTION_STRING);
    await server.start();
    server.applyMiddleware({app});

    app.listen(config.PORT);
    console.log('[>] Everything is running');
}

bootstrap();
