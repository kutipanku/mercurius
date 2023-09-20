import { Resolver, Mutation, Arg } from 'type-graphql';
import { Author } from '@/entity';
import { DeleteAuthorInput } from '@/modules/author/input';

@Resolver(Author)
export class DeleteAuthorResolver {
  /* ------------------------------------
  => Delete author based on Id
  ------------------------------------ */
  @Mutation(() => Author)
  async deleteAuthor(
    @Arg('data')
    { id }: DeleteAuthorInput
  ): Promise<Author | null> {
    const author = await Author.findOne({ where: { id } });
    if (!author) {
      return null;
    } else {
      await author.softRemove();
    }

    return author;
  }

  /* ------------------------------------
  => Restore author based on Id
  ------------------------------------ */
  @Mutation(() => Author)
  async restoreAuthor(
    @Arg('data')
    { id }: DeleteAuthorInput
  ): Promise<Author | null> {
    const author = await Author.findOne({ withDeleted: true, where: { id } });
    if (!author) {
      return null;
    } else {
      await author.recover();
    }

    return author;
  }

  /* ------------------------------------
  => Delete author based on Id permanently
  ------------------------------------ */
  @Mutation(() => Author)
  async deletePermanentAuthor(
    @Arg('data')
    { id }: DeleteAuthorInput
  ): Promise<Author | null> {
    const author = await Author.findOne({ withDeleted: true, where: { id } });
    if (!author) {
      return null;
    } else {
      return await author.remove();
    }
  }
}
