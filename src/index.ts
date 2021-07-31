import 'reflect-metadata';
import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { SayHelloResolver } from './modules/hello';
import {
  CreateAuthorResolver,
  ReadAuthorResolver,
  UpdateAuthorResolver
} from './modules/author';
import {
  CreateLanguageResolver,
  ReadLanguageResolver,
  UpdateLanguageResolver
} from './modules/language';
import {
  CreateQuoteResolver,
  ReadQuoteResolver
} from './modules/quote';
import {
  ReadContentResolver
} from './modules/content';

import cors from 'cors';
import { SharedContext } from './types';
import dotenv from 'dotenv';

const main = async (): Promise<void> => {
  // Load env variable
  const result = dotenv.config();
  if (result.error) {
    console.log('Failed to load env variables | ', result.error);
  }

  console.log(result.parsed);

  await createConnection();
  const schema = await buildSchema({
    resolvers: [SayHelloResolver, CreateAuthorResolver, ReadAuthorResolver, UpdateAuthorResolver, CreateLanguageResolver, ReadLanguageResolver, UpdateLanguageResolver, CreateQuoteResolver, ReadQuoteResolver, ReadContentResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: SharedContext): SharedContext => ({ req })
  });
  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_APP_URL || 'http://localhost:3000'
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(process.env.APP_PORT || 4000, () => {
    console.log(
      `Server started on http://localhost:${
        process.env.APP_PORT || 4000
      }/graphql`
    );
  });
};

main();
