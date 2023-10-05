import { Resolver, Mutation, Arg } from 'type-graphql';
import { Author, Quote, Tag } from '@/entity';
import { UpdateQuoteInput } from '@/modules/quote/input';

@Resolver(Quote)
export class UpdateQuoteResolver {
  /* ------------------------------------
  => Update existing quote
  ------------------------------------ */
  @Mutation(() => Quote)
  async updateQuote(
    @Arg('data')
    { id, status, authorId, contentID, contentEN, tags }: UpdateQuoteInput
  ): Promise<Quote | null> {
    const selectedQuote: Quote | undefined = await Quote.findOne({
      where: { id }
    });
    if (!selectedQuote) {
      return null; // Quote Not Found
    }

    selectedQuote.status = status;
    selectedQuote.authorId = authorId;
    const newAuthor: Author | undefined = await Author.findOne({
      where: {
        id: authorId
      }
    })

    if (newAuthor) {
      selectedQuote.author = newAuthor;
    }

    if (contentID) {
      selectedQuote.contentID = contentID;
    }

    if (contentEN) {
      selectedQuote.contentEN = contentEN;
    }

    const editedTags = await Promise.all(tags.map(async (tag: number, index: number) => {
      const tagFromDB = await Tag.findOne({
        where: {
          id: tag
        }
      });

      if (!tagFromDB) {
        return selectedQuote.tags[index];
      }

      return tagFromDB;
    }));

    selectedQuote.tags = editedTags;

    await selectedQuote.save();

    return selectedQuote;
  }
}
