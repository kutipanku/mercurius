import { Resolver, Mutation, Arg } from 'type-graphql';
import { Tag } from '@/entity';
import { DeleteTagInput } from '@/modules/tag/input';


@Resolver(Tag)
export class DeleteTagResolver {
  /* ------------------------------------
  => Delete tag based on Id
  ------------------------------------ */
  @Mutation(() => Tag)
  async deleteTag(
    @Arg('data')
    { id }: DeleteTagInput
  ): Promise<Tag | null> {
    const tag = await Tag.findOne({ where: { id } });
    if (!tag) {
      return null;
    } else {
      await tag.softRemove();
    }

    return tag;
  }

  /* ------------------------------------
  => Restore tag based on Id
  ------------------------------------ */
  @Mutation(() => Tag)
  async restoreTag(
    @Arg('data')
    { id }: DeleteTagInput
  ): Promise<Tag | null> {
    const tag = await Tag.findOne({ withDeleted: true, where: { id } });
    if (!tag) {
      return null;
    } else {
      await tag.recover();
    }

    return tag;
  }

  /* ------------------------------------
  => Delete tag based on Id permanently
  ------------------------------------ */
  @Mutation(() => Tag)
  async deletePermanentTag(
    @Arg('data')
    { id }: DeleteTagInput
  ): Promise<Tag | null> {
    const tag = await Tag.findOne({ withDeleted: true, where: { id } });
    if (!tag) {
      return null;
    } else {
      return await tag.remove();
    }
  }
}
