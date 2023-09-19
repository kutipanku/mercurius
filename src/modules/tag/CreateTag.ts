import { Resolver, Mutation, Arg } from 'type-graphql';
import { Tag } from '../../entity/Tag';
import { AddTagInput } from './input/AddTagInput';

@Resolver(Tag)
export class CreateTagResolver {
  /* ------------------------------------
  => Add new tag
  ------------------------------------ */
  @Mutation(() => Tag)
  async createTag(
    @Arg('data')
    { contents }: AddTagInput
  ): Promise<Tag> {
    const tag = await Tag.create({
      contents
    }).save();

    return tag;
  }
}
