import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote } from '../../entity/Quote';
import { AddQuoteInput } from './input/AddQuoteInput';
import { getCurrentDateTimeString } from '../../utils'
import { AddContentInput } from '../content/input/AddContentInput';

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
    const currentDateTime: string = getCurrentDateTimeString();
    const processedContents: AddContentInput[] = contents.map((content: AddContentInput) => {
      return {
        ...content,
        createDate: currentDateTime
      }
    })
    const quote = await Quote.create({
      authorId,
      status: status,
      contents: processedContents,
      createDate: currentDateTime
    }).save();

    return quote;
  }
}
