import { Resolver, Query, Arg } from 'type-graphql';
import { Content } from '../../entity/Content';

@Resolver(Content)
export class ReadContentResolver {
  /* ------------------------------------
  => Get content by id
  ------------------------------------ */
  @Query(() => Content, { nullable: true })
  async content(@Arg('id') id: string): Promise<Content | null> {
    const content = await Content.findOne({ where: { id } });
    if (!content) {
      return null;
    }
    return content;
  }

  /* ------------------------------------
  => Get all contents
  ------------------------------------ */
  @Query(() => [Content])
  async allContent(
    @Arg('page', { nullable: true }) page: number,
    @Arg('rowPerPage', { nullable: true }) rowPerPage: number
  ): Promise<Content[] | null> {
    let contents = [];
    if (rowPerPage === 0) {
      contents = await Content.find();
    } else {
      contents = await Content.find({
        skip: (page - 1) * rowPerPage,
        take: rowPerPage,
        relations: ["quote"]
      });
    }
    if (!contents) {
      return null;
    }
    return contents;
  }
}
