import { Resolver, Mutation, Arg } from 'type-graphql';
import { Tag } from '../../entity/Tag';
import { EditTagInput } from './input/EditTagInput';

@Resolver(Tag)
export class UpdateTagResolver {
  /* ------------------------------------
  => Edit tag based on Id
  ------------------------------------ */
  @Mutation(() => Tag)
  async updateTag(
    @Arg('data')
    { id, name }: EditTagInput
  ): Promise<Tag | null> {
    const tag = await Tag.findOne({ where: { id } });
    if (!tag) {
      return null;
    } else {
      tag.name = name;
      await tag.save();
    }

    return tag;
  }
}
