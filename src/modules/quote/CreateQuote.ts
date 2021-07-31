import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote } from '../../entity/Quote';
import { AddQuoteInput } from './input/AddQuoteInput';

@Resolver(Quote)
export class CreateQuoteResolver {
  /* ------------------------------------
  => Add new author
  ------------------------------------ */
  @Mutation(() => Quote)
  async createQuote(
    @Arg('data')
    { content, authorId, languageId }: AddQuoteInput
  ): Promise<Quote> {
    const quote = await Quote.create({
      content,
      authorId,
      languageId,
      status: '',
      isDeleted: false
    }).save();

    return quote;
  }
}
