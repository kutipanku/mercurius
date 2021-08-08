import { Resolver, Query, Arg } from 'type-graphql';
import { Tag } from '../../entity/Tag';

@Resolver(Tag)
export class ReadTagResolver {
  /* ------------------------------------
  => Get tag by id
  ------------------------------------ */
  @Query(() => Tag, { nullable: true })
  async tag(@Arg('id') id: string): Promise<Tag | null> {
    const tag = await Tag.findOne({ where: { id } });
    if (!tag) {
      return null;
    }
    return tag;
  }

  /* ------------------------------------
  => Get all tags
  ------------------------------------ */
  @Query(() => [Tag])
  async allTag(
    @Arg('page', { nullable: true }) page: number,
    @Arg('rowPerPage', { nullable: true }) rowPerPage: number
  ): Promise<Tag[] | null> {
    let tags = [];
    if (rowPerPage === 0) {
      tags = await Tag.find({
        relations: ['quotes']
      });
    } else {
      tags = await Tag.find({
        skip: (page - 1) * rowPerPage,
        take: rowPerPage,
        relations: ['quotes']
      });
    }
    if (!tags) {
      return null;
    }
    return tags;
  }
}
