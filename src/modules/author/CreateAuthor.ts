import { Resolver, Mutation, Arg } from 'type-graphql';
import { Author } from '../../entity/Author';
import { AddAuthorInput } from './input/AddAuthorInput';

@Resolver(Author)
export class CreateAuthorResolver {
  /* ------------------------------------
  => Add new author
  ------------------------------------ */
  @Mutation(() => Author)
  async createAuthor(
    @Arg('data')
    { name, pictureUrl }: AddAuthorInput
  ): Promise<Author> {
    const author = await Author.create({
      name, pictureUrl
    }).save();

    return author;
  }
}
