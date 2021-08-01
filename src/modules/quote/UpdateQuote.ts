import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote } from '../../entity/Quote';
import { EditQuoteInput } from './input/EditQuoteInput';

@Resolver(Quote)
export class UpdateQuoteResolver {
  /* ------------------------------------
  => Update existing quote
  ------------------------------------ */
  @Mutation(() => Quote)
  async updateQuote(
    @Arg('quoteData')
    { id, status, authorId, contents }: EditQuoteInput
  ): Promise<Quote | null> {
    const selectedQuote = await Quote.findOne({ where: { id } });
    if (!selectedQuote) {
      return null;
    }
    
    selectedQuote.status = status;
    selectedQuote.authorId = authorId;
    const constIdOne = selectedQuote.contents[0].id
    const constIdTwo = selectedQuote.contents[1].id
    if (constIdOne === contents[0].id) {
      selectedQuote.contents[0].text = contents[0].text;
      selectedQuote.contents[0].languageId = contents[0].languageId;
    } else {
      selectedQuote.contents[1].text = contents[0].text;
      selectedQuote.contents[1].languageId = contents[0].languageId;
    }

    if (constIdTwo === contents[1].id) {
      selectedQuote.contents[1].text = contents[1].text;
      selectedQuote.contents[1].languageId = contents[1].languageId;
    } else {
      selectedQuote.contents[0].text = contents[1].text;
      selectedQuote.contents[0].languageId = contents[1].languageId;
    }
    await selectedQuote.save();
    
    return selectedQuote;
  }
}
