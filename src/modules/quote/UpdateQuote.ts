import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote } from '../../entity/Quote';
import { Content } from '../../entity/Content';
import { EditQuoteInput } from './input/EditQuoteInput';
import { getCurrentDateTimeString } from '../../utils'
import { EditContentInput } from '../content/input/EditContentInput';

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
    const selectedQuote: Quote | undefined = await Quote.findOne({ where: { id } });
    if (!selectedQuote) {
      return null;
    }
    const currentDateTime: string = getCurrentDateTimeString();
    
    selectedQuote.status = status;
    selectedQuote.authorId = authorId;
    selectedQuote.updateDate = currentDateTime;

    contents.forEach((content: EditContentInput, contentIndex: number) => {
      selectedQuote.contents.forEach((contentEntity: Content, contentEntityIndex: number) => {
        if (contentEntity.id === content.id) {
          selectedQuote.contents[contentEntityIndex].text = contents[contentIndex].text;
          selectedQuote.contents[contentEntityIndex].languageId = contents[contentIndex].languageId;
          selectedQuote.contents[contentEntityIndex].updateDate = currentDateTime;
        }
      })
    })
    await selectedQuote.save();
    
    return selectedQuote;
  }
}
