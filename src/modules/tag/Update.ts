import { Resolver, Mutation, Arg } from 'type-graphql';
import { Tag } from '@/entity';
import { UpdateTagInput } from '@/modules/tag/input';

@Resolver(Tag)
export class UpdateTagResolver {
  /* ------------------------------------
  => Edit tag based on Id
  ------------------------------------ */
  @Mutation(() => Tag)
  async updateTag(
    @Arg('data')
    { id, contentID, contentEN }: UpdateTagInput
  ): Promise<Tag | null> {
    const tag = await Tag.findOne({ where: { id } });
    if (!tag) {
      return null;
    } else {
      if (contentID) {
        tag.contentID = contentID;
      }
      if (contentEN) {
        tag.contentEN = contentEN;
      }
      await tag.save();
    }

    return tag;
  }
}
