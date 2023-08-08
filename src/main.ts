import express from 'express';
import {config} from "./config/config";
import {ApolloServer} from "apollo-server-express";
import {AuthTypeDef} from "./auth/auth.type-def";
import {AuthResolver} from "./auth/auth.resolver";

async function bootstrap() {
    const app = express();
    const server =
        new ApolloServer({typeDefs: AuthTypeDef.typeDef,
            resolvers: AuthResolver.resolver});

    await server.start();
    server.applyMiddleware({app});

    app.listen(config.PORT);
}

bootstrap();
