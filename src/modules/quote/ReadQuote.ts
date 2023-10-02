import { Resolver, Query, Arg } from 'type-graphql';
import { Quote } from '@/entity';

@Resolver(Quote)
export class ReadQuoteResolver {
  /* ------------------------------------
  => Get quote by id
  ------------------------------------ */
  @Query(() => Quote, { nullable: true })
  async getQuoteById(@Arg('id') id: string): Promise<Quote | null> {
    const quote = await Quote.findOne({ where: { id } });
    if (!quote) {
      return null;
    }
    return quote;
  }

  /* ------------------------------------
  => Get all quotes
  ------------------------------------ */
  @Query(() => [Quote])
  async getAllQuotes(
    @Arg('page') page: number,
    @Arg('rowPerPage') rowPerPage: number
  ): Promise<Quote[] | null> {
    let quotes = [];
    if (rowPerPage === 0) {
      quotes = await Quote.find();
    } else {
      quotes = await Quote.find({
        skip: (page - 1) * rowPerPage,
        take: rowPerPage
      });
    }
    if (!quotes) {
      return null;
    }
    return quotes;
  }
}
