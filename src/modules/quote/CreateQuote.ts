import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote } from '../../entity/Quote';
import { Content } from '../../entity/Content';
import { AddQuoteInput } from './input/AddQuoteInput';

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
      status: status
    }).save();

    for (let index = 0; index < contents.length; index++) {
      const content = contents[index];
      await Content.create({
        ...content,
        quoteId: quote.id
      }).save();
    }

    return quote;
  }
}
