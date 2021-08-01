import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote } from '../../entity/Quote';
// import { Content } from '../../entity/Content';
import { AddQuoteInput } from './input/AddQuoteInput';
// import { AddContentInput } from '../content/input/AddContentInput';

@Resolver(Quote)
export class CreateQuoteResolver {
  /* ------------------------------------
  => Add new quote
  ------------------------------------ */
  @Mutation(() => Quote)
  async createQuote(
    @Arg('quoteData')
    { authorId, status, contents }: AddQuoteInput
  ): Promise<Quote> {
    const quote = await Quote.create({
      authorId,
      status: status,
      contents
    }).save();

    return quote;
  }
}
