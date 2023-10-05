import { Resolver, Mutation, Arg } from 'type-graphql';
import { Category } from '@/entity';
import { UpdateCategoryInput } from '@/modules/category/input';

@Resolver(Category)
export class UpdateCategoryResolver {
  /* ------------------------------------
  => Edit category based on Id
  ------------------------------------ */
  @Mutation(() => Category)
  async updateCategory(
    @Arg('data')
    { id, contentID, contentEN }: UpdateCategoryInput
  ): Promise<Category | null> {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return null;
    } else {
      if (contentID) {
        category.contentID = contentID;
      }
      if (contentEN) {
        category.contentEN = contentEN;
      }
      await category.save();
    }

    return category;
  }
}
