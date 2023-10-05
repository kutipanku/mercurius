import { Resolver, Mutation, Arg } from 'type-graphql';
import { Tag } from '@/entity';
import { CreateTagInput } from '@/modules/tag/input';

@Resolver(Tag)
export class CreateTagResolver {
  /* ------------------------------------
  => Add new tag
  ------------------------------------ */
  @Mutation(() => Tag)
  async createTag(
    @Arg('data')
    { contentID, contentEN }: CreateTagInput
  ): Promise<Tag> {
    const tag = await Tag.create({
      contentID, contentEN
    }).save();

    return tag;
  }
}
