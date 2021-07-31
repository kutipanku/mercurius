import { Resolver, Query, Arg } from 'type-graphql';
import { Quote } from '../../entity/Quote';

@Resolver(Quote)
export class ReadQuoteResolver {
  /* ------------------------------------
  => Get quote by id
  ------------------------------------ */
  @Query(() => Quote, { nullable: true })
  async quote(@Arg('id') id: string): Promise<Quote | null> {
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
  async allQuote(
    @Arg('page', { nullable: true }) page: number,
    @Arg('rowPerPage', { nullable: true }) rowPerPage: number
  ): Promise<Quote[] | null> {
    let quotes = [];
    if (rowPerPage === 0) {
      quotes = await Quote.find();
    } else {
      quotes = await Quote.find({
        skip: (page - 1) * rowPerPage,
        take: rowPerPage,
      });
    }
    if (!quotes) {
      return null;
    }
    return quotes;
  }

  /* ------------------------------------
  => Get all quotes by language
  ------------------------------------ */
  @Query(() => [Quote])
  async allQuoteByLanguage(
    @Arg('page', { nullable: true }) page: number,
    @Arg('rowPerPage', { nullable: true }) rowPerPage: number,
    @Arg('language', { nullable: true }) language: number
  ): Promise<Quote[] | null> {
    let quotes = [];
    if (rowPerPage === 0) {
      quotes = await Quote.find({
        where: [
          { languageId: language }
        ]
      });
    } else {
      quotes = await Quote.find({
        skip: (page - 1) * rowPerPage,
        take: rowPerPage,
        where: [
          { languageId: language }
        ]
      });
    }
    if (!quotes) {
      return null;
    }
    return quotes;
  }
}
