import { Resolver, Mutation, Arg } from 'type-graphql';
import { Category } from '../../entity/Category';
import { CategoryContent } from '../../entity/CategoryContent';
import { EditCategoryInput } from './input/EditCategoryInput';
import { EditCategoryContentInput } from '../categoryContent/input/EditCategoryContentInput';

@Resolver(Category)
export class UpdateCategoryResolver {
  /* ------------------------------------
  => Edit category based on Id
  ------------------------------------ */
  @Mutation(() => Category)
  async updateCategory(
    @Arg('data')
    { id, contents }: EditCategoryInput
  ): Promise<Category | null> {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return null;
    } else {
      const editedContents = await Promise.all(contents.map(async (content: EditCategoryContentInput, index: number) => {
        const contentFromDB = await CategoryContent.findOne({
          where: {
            id: content.id
          },
        });

        if (!contentFromDB) {
          return category.contents[index];
        }

        contentFromDB.text = content.text;
        contentFromDB.languageId = content.languageId;
        return contentFromDB;
      }));

      category.contents = editedContents;
      await category.save();
    }

    return category;
  }
}
