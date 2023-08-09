import express from 'express';
import {config} from "./config/config";
import {ApolloServer} from "apollo-server-express";
import {AuthTypeDef} from "./auth/auth.type-def";
import {QueryResolver} from "./auth/resolver/query.resolver";
import {connect as connectToMongo} from "mongoose";
import {authUserMiddleware} from "./middleware/auth-user.middleware";
import {MutationResolver} from "./auth/resolver/mutation.resolver";

async function bootstrap() {
    const app = express();

    const resolvers = {
        Query: QueryResolver.query,
        Mutation: MutationResolver.mutation
    }
    //@ts-ignore
    const server =
        new ApolloServer({
            typeDefs: AuthTypeDef.typeDef,
            resolvers,
            context: async ({req, res}) => ({req, res, authUserMiddleware}),
        });

    await connectToMongo(config.MONGO_CONNECTION_STRING);
    await server.start();

    server.applyMiddleware({app});

    app.listen(config.PORT);
    console.log('[>] Everything is running');
}

bootstrap();
