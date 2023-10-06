import 'reflect-metadata';
import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import cors from 'cors';
import dotenv from 'dotenv';
import {
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
  CreateCategoryResolver,
  ReadCategoryResolver,
  UpdateCategoryResolver,
  DeleteCategoryResolver,
  CreateTagResolver,
  ReadTagResolver,
  UpdateTagResolver,
  DeleteTagResolver,
  ListenTwitterResolver
} from '@/modules';
import { SharedContext } from './types';

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
      CreateCategoryResolver,
      ReadCategoryResolver,
      UpdateCategoryResolver,
      DeleteCategoryResolver,
      CreateTagResolver,
      ReadTagResolver,
      UpdateTagResolver,
      DeleteTagResolver,
      ListenTwitterResolver
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
