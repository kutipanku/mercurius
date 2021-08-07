import { Resolver, Mutation, Arg } from 'type-graphql';
import { Category } from '../../entity/Category';
import { EditCategoryInput } from './input/EditCategoryInput';

@Resolver(Category)
export class UpdateCategoryResolver {
  /* ------------------------------------
  => Edit category based on Id
  ------------------------------------ */
  @Mutation(() => Category)
  async updateCategory(
    @Arg('data')
    { id, name }: EditCategoryInput
  ): Promise<Category | null> {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return null;
    } else {
      category.name = name;
      await category.save();
    }

    return category;
  }
}
