import { Resolver, Mutation, Arg } from 'type-graphql';
import { Author } from '@/entity';
import { UpdateAuthorInput } from '@/modules/author/input';

@Resolver(Author)
export class UpdateAuthorResolver {
  /* ------------------------------------
  => Edit author based on Id
  ------------------------------------ */
  @Mutation(() => Author)
  async updateAuthor(
    @Arg('data')
    { id, name, pictureUrl, contentID, contentEN }: UpdateAuthorInput
  ): Promise<Author | null> {
    const author = await Author.findOne({ where: { id } });
    if (!author) {
      return null;
    } else {
      author.name = name;
      if (pictureUrl) {
        author.pictureUrl = pictureUrl;
      }
      if (contentID) {
        author.contentID = contentID;
      }
      if (contentEN) {
        author.contentEN = contentEN;
      }
      await author.save();
    }

    return author;
  }
}
