import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote } from '../../entity/Quote';
import { DeleteQuoteInput } from './input/DeleteQuoteInput';

@Resolver(Quote)
export class DeleteQuoteResolver {
  /* ------------------------------------
  => Delete existing quote
  ------------------------------------ */
  @Mutation(() => Quote)
  async deleteQuote(
    @Arg('data')
    { id }: DeleteQuoteInput
  ): Promise<Quote | null> {
    const selectedQuote: Quote | undefined = await Quote.findOne({
      where: { id }
    });
    if (!selectedQuote) {
      return null;
    }
    await selectedQuote.softRemove();
    return selectedQuote;
  }

  /* ------------------------------------
  => Restore existing quote
  ------------------------------------ */
  @Mutation(() => Quote)
  async restoreQuote(
    @Arg('data')
    { id }: DeleteQuoteInput
  ): Promise<Quote | null> {
    const selectedQuote: Quote | undefined = await Quote.findOne({
      withDeleted: true,
      where: { id }
    });
    if (!selectedQuote) {
      return null;
    }
    await selectedQuote.recover();
    return selectedQuote;
  }
}
