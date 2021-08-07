import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote } from '../../entity/Quote';
import { AddQuoteInput } from './input/AddQuoteInput';
import { AddContentInput } from '../content/input/AddContentInput';

@Resolver(Quote)
export class CreateQuoteResolver {
  /* ------------------------------------
  => Add new quote
  ------------------------------------ */
  @Mutation(() => Quote)
  async createQuote(
    @Arg('data')
    { authorId, categoryId, status, contents }: AddQuoteInput
  ): Promise<Quote> {
    const processedContents: AddContentInput[] = contents.map(
      (content: AddContentInput) => {
        return {
          ...content
        };
      }
    );
    const quote = await Quote.create({
      authorId,
      categoryId,
      status: status,
      contents: processedContents
    }).save();

    return quote;
  }
}
