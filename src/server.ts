import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import mongoose from 'mongoose';
import { UserResolver } from './graphql/resolvers/UserResolver';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { RoleResolver } from './graphql/resolvers/RoleResolver';
import { buildAppHeaderContext } from './graphql/plugins/buildAppHeaderContext';

async function bootstrap() {
  dotenv.config();
  const app: any = express();
  app.use(express.json());
  app.use(cors());
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI!);

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [UserResolver, RoleResolver],
  });

  // Set up Apollo Server
  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({
        embed: true as boolean, // Allow access graphql playground
      }),
    ],
    context: buildAppHeaderContext,
    introspection: true // Enables tools like GraphQL, Apollo Sandbox, and Postman to see available types, queries, and mutations.
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
}

bootstrap();
