import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote } from '../../entity/Quote';
import { Content } from '../../entity/Content';
import { AddQuoteInput } from './input/AddQuoteInput';

@Resolver(Quote)
export class CreateQuoteResolver {
  /* ------------------------------------
  => Add new author
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
      const createdContent = await Content.create({
        ...content,
        quoteId: quote.id
      }).save();
      console.log('createdContent', createdContent)
    }

    await console.log('===================================')
    await console.log('createdQuote', quote)
    await console.log('===================================')

    return quote;
  }
}
