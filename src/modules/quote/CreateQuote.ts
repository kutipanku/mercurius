import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote, Tag } from '@/entity';
import { AddQuoteInput } from './input/AddQuoteInput';

@Resolver(Quote)
export class CreateQuoteResolver {
  /* ------------------------------------
  => Add new quote
  ------------------------------------ */
  @Mutation(() => Quote)
  async createQuote(
    @Arg('data')
    { authorId, categoryId, status, contents, tags }: AddQuoteInput
  ): Promise<Quote> {
    const quote = await Quote.create({
      authorId,
      categoryId,
      status: status,
      contents
    })

    const processedTags = await Promise.all(tags.map(async (tag: number, index: number) => {
      const contentFromDB = await Tag.findOne({
        where: {
          id: tag
        },
      });

      if (!contentFromDB) {
        return quote.tags[index];
      }

      return contentFromDB;
    }));

    quote.tags = processedTags;

    await quote.save();

    return quote;
  }
}
