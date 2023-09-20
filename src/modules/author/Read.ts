import { Resolver, Query, Arg } from 'type-graphql';
import { Author } from '@/entity';
import { AuthorResponse } from '@/modules/author/response'

@Resolver(Author)
export class ReadAuthorResolver {
  /* ------------------------------------
  => Get author by id
  ------------------------------------ */
  @Query(() => Author, { nullable: true })
  async author(@Arg('id') id: number): Promise<Author | null> {
    const author = await Author.findOne({ where: { id }, relations: ['quotes'] });
    if (!author) {
      return null;
    }
    return author;
  }

  /* ------------------------------------
  => Get all authors
  ------------------------------------ */
  @Query(() => AuthorResponse)
  async allAuthor(
    @Arg('page', { nullable: true }) page: number,
    @Arg('rowPerPage', { nullable: true }) rowPerPage: number
  ): Promise<AuthorResponse | null> {
    let authors = [];
    if (rowPerPage === 0) {
      authors = await Author.find({
        relations: ['quotes']
      });
    } else {
      authors = await Author.find({
        skip: (page - 1) * rowPerPage,
        take: rowPerPage,
        relations: ['quotes']
      });
    }

    if (!authors) {
      return null;
    }

    const count = await Author.count();

    const response: AuthorResponse = {
      page,
      showing: authors.length,
      total: count,
      data: authors,
    }

    return response;
  }

  // TODO: implement @FieldResolver for quotes
}
