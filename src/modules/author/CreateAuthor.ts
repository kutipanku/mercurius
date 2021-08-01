import { Resolver, Mutation, Arg } from 'type-graphql';
import { Author } from '../../entity/Author';
import { AddAuthorInput } from './input/AddAuthorInput';
import { getCurrentDateTimeString } from '../../utils'

@Resolver(Author)
export class CreateAuthorResolver {
  /* ------------------------------------
  => Add new author
  ------------------------------------ */
  @Mutation(() => Author)
  async createAuthor(
    @Arg('data')
    { name }: AddAuthorInput
  ): Promise<Author> {
    const currentDateTime: string = getCurrentDateTimeString();
    const author = await Author.create({
      name,
      createDate: currentDateTime
    }).save();

    return author;
  }
}
