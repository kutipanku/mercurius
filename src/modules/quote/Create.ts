import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote, Tag } from '@/entity';
import { CreateQuoteInput } from '@/modules/quote/input';

@Resolver(Quote)
export class CreateQuoteResolver {
  /* ------------------------------------
  => Add new quote
  ------------------------------------ */
  @Mutation(() => Quote)
  async createQuote(
    @Arg('data')
    { authorId, categoryId, status, contentID, contentEN, tags }: CreateQuoteInput
  ): Promise<Quote> {
    const quote = await Quote.create({
      authorId,
      categoryId,
      status,
      contentID,
      contentEN
    })

    if (tags) {
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
    }

    await quote.save();

    return quote;
  }
}
