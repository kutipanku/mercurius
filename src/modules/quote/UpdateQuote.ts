import { Resolver, Mutation, Arg } from 'type-graphql';
import { Quote } from '../../entity/Quote';
import { Author } from '../../entity/Author';
import { QuoteContent } from '../../entity/QuoteContent';
import { Tag } from '../../entity/Tag';
import { EditQuoteInput } from './input/EditQuoteInput';
import { EditQuoteContentInput } from '../quoteContent/input/EditQuoteContentInput';
import { EditTagInput } from '../tag/input/EditTagInput';

@Resolver(Quote)
export class UpdateQuoteResolver {
  /* ------------------------------------
  => Update existing quote
  ------------------------------------ */
  @Mutation(() => Quote)
  async updateQuote(
    @Arg('data')
    { id, status, authorId, contents, tags }: EditQuoteInput
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

    if (!newAuthor) {
      return null; // Author Not Found
    }

    selectedQuote.author = newAuthor;

    const editedContents = await Promise.all(contents.map(async (content: EditQuoteContentInput, index: number) => {
      const contentFromDB = await QuoteContent.findOne({
        where: {
          id: content.id
        }
      });

      if (!contentFromDB) {
        return selectedQuote.contents[index];
      }

      contentFromDB.text = content.text;
      contentFromDB.languageId = content.languageId;
      return contentFromDB;
    }));

    selectedQuote.contents = editedContents;

    // const tagResult: Tag[] = [];
    // const existsTag = tags.filter(async (tag: EditTagInput) => {
    //   const currentTag = await Tag.findOne({
    //     where: {
    //       id: tag.id
    //     }
    //   })

    //   console.log('==================================')
    //   console.log('currentTag', currentTag)
    //   console.log('==================================')


    //   if (currentTag) {
    //     tagResult.push(currentTag);
    //     return currentTag;
    //   }

    //   return false
    // });

    // await Promise.all(existsTag);

    // console.log('==================================')
    // console.log('tagResult', tagResult)
    // console.log('==================================')

    // ).then(() => {
    //   console.log('==================================')
    //   console.log('tagResult', tagResult)
    //   console.log('==================================')
    // });

    const editedTags = await Promise.all(tags.map(async (tag: EditTagInput, index: number) => {
      const tagFromDB = await Tag.findOne({
        where: {
          id: tag.id
        }
      });

      if (!tagFromDB) {
        return selectedQuote.tags[index];
      }

      return tagFromDB;
    }));

    console.log('==================================')
    console.log('editedTags', editedTags)
    console.log('==================================')

    selectedQuote.tags = editedTags;



    // tags.forEach((tag: EditTagInput, tagIndex: number) => {
    //   selectedQuote.tags.forEach(
    //     (tagEntity: Tag, tagEntityIndex: number) => {
    //       if (tagEntity.id === tag.id) {
    //         selectedQuote.tags[tagEntityIndex].text =
    //           contents[contentIndex].text;
    //         selectedQuote.contents[contentEntityIndex].languageId =
    //           contents[contentIndex].languageId;
    //       }
    //     }
    //   );
    // });

    console.log('==================================')
    console.log('selectedQuote', selectedQuote)
    console.log('==================================')

    await selectedQuote.save();

    return selectedQuote;
  }
}
