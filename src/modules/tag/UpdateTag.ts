import { Resolver, Mutation, Arg } from 'type-graphql';
import { Tag, TagContent } from '@/entity';
import { EditTagInput } from './input/EditTagInput';
import { EditTagContentInput } from '../tagContent/input/EditTagContentInput';

@Resolver(Tag)
export class UpdateTagResolver {
  /* ------------------------------------
  => Edit tag based on Id
  ------------------------------------ */
  @Mutation(() => Tag)
  async updateTag(
    @Arg('data')
    { id, contents }: EditTagInput
  ): Promise<Tag | null> {
    const tag = await Tag.findOne({ where: { id } });
    if (!tag) {
      return null;
    } else {
      const editedContents = await Promise.all(contents.map(async (content: EditTagContentInput, index: number) => {
        const contentFromDB = await TagContent.findOne({
          where: {
            id: content.id
          },
        });

        if (!contentFromDB) {
          return tag.contents[index];
        }

        contentFromDB.text = content.text;
        contentFromDB.languageId = content.languageId;
        return contentFromDB;
      }));

      tag.contents = editedContents;
      await tag.save();
    }

    return tag;
  }
}
