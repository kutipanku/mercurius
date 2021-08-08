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
    { name }: AddTagInput
  ): Promise<Tag> {
    const tag = await Tag.create({
      name
    }).save();

    return tag;
  }
}
