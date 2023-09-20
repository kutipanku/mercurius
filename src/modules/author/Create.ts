import { Resolver, Mutation, Arg } from 'type-graphql';
import { Author } from '@/entity/Author';
import { CreateAuthorInput } from '@/modules/author/input';

@Resolver(Author)
export class CreateAuthorResolver {
  /* ------------------------------------
  => Add new author
  ------------------------------------ */
  @Mutation(() => Author)
  async createAuthor(
    @Arg('data')
    { name, pictureUrl, contents }: CreateAuthorInput
  ): Promise<Author> {
    const author = await Author.create({
      name, pictureUrl, contents
    }).save();

    return author;
  }
}
