import { Resolver, Mutation, Arg } from 'type-graphql';
import { Category, CategoryContent } from '@/entity';
import { UpdateCategoryInput } from '@/modules/category/input';
import { UpdateCategoryContentInput } from '@/modules/categoryContent/input';

@Resolver(Category)
export class UpdateCategoryResolver {
  /* ------------------------------------
  => Edit category based on Id
  ------------------------------------ */
  @Mutation(() => Category)
  async updateCategory(
    @Arg('data')
    { id, contents }: UpdateCategoryInput
  ): Promise<Category | null> {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return null;
    } else {
      const editedContents = await Promise.all(contents.map(async (content: UpdateCategoryContentInput, index: number) => {
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
