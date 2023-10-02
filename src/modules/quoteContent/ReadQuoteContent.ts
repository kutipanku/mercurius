import { Resolver, Query, Arg } from 'type-graphql';
import { QuoteContent } from '@/entity';

@Resolver(QuoteContent)
export class ReadQuoteContentResolver {
  /* ------------------------------------
  => Get content by id
  ------------------------------------ */
  @Query(() => QuoteContent, { nullable: true })
  async content(@Arg('id') id: string): Promise<QuoteContent | null> {
    const content = await QuoteContent.findOne({ where: { id } });
    if (!content) {
      return null;
    }
    return content;
  }

  /* ------------------------------------
  => Get all contents
  ------------------------------------ */
  @Query(() => [QuoteContent])
  async allContent(
    @Arg('page', { nullable: true }) page: number,
    @Arg('rowPerPage', { nullable: true }) rowPerPage: number
  ): Promise<QuoteContent[] | null> {
    let contents = [];
    if (rowPerPage === 0) {
      contents = await QuoteContent.find({
        relations: ['quote']
      });
    } else {
      contents = await QuoteContent.find({
        skip: (page - 1) * rowPerPage,
        take: rowPerPage,
        relations: ['quote']
      });
    }
    if (!contents) {
      return null;
    }
    return contents;
  }
}
