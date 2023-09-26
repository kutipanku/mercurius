import 'reflect-metadata';
import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { SayPongResolver } from './modules/ping';
import {
  CreateAuthorResolver,
  ReadAuthorResolver,
  UpdateAuthorResolver,
  DeleteAuthorResolver
} from './modules/author';
import {
  CreateLanguageResolver,
  ReadLanguageResolver,
  UpdateLanguageResolver
} from './modules/language';
import {
  CreateQuoteResolver,
  ReadQuoteResolver,
  UpdateQuoteResolver,
  DeleteQuoteResolver
} from './modules/quote';
import { ReadQuoteContentResolver } from './modules/quoteContent';
import {
  CreateCategoryResolver,
  ReadCategoryResolver,
  UpdateCategoryResolver,
  DeleteCategoryResolver
} from './modules/category';
import {
  CreateTagResolver,
  ReadTagResolver,
  UpdateTagResolver,
  DeleteTagResolver
} from './modules/tag';

import cors from 'cors';
import { SharedContext } from './types';
import dotenv from 'dotenv';

const main = async (): Promise<void> => {
  // Load env variable
  const result = dotenv.config();
  if (result.error) {
    console.log('Failed to load env variables | ', result.error);
  }

  await createConnection();
  const schema = await buildSchema({
    resolvers: [
      SayPongResolver,
      CreateAuthorResolver,
      ReadAuthorResolver,
      UpdateAuthorResolver,
      DeleteAuthorResolver,
      CreateLanguageResolver,
      ReadLanguageResolver,
      UpdateLanguageResolver,
      CreateQuoteResolver,
      ReadQuoteResolver,
      UpdateQuoteResolver,
      DeleteQuoteResolver,
      ReadQuoteContentResolver,
      CreateCategoryResolver,
      ReadCategoryResolver,
      UpdateCategoryResolver,
      DeleteCategoryResolver,
      CreateTagResolver,
      ReadTagResolver,
      UpdateTagResolver,
      DeleteTagResolver
    ]
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
      `Server started on http://localhost:${process.env.APP_PORT || 4000
      }/graphql`
    );
  });
};

main();
