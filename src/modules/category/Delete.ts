import { Resolver, Mutation, Arg } from 'type-graphql';
import { Category } from '@/entity';
import { DeleteCategoryInput } from '@/modules/category/input';

@Resolver(Category)
export class DeleteCategoryResolver {
  /* ------------------------------------
  => Delete category based on Id
  ------------------------------------ */
  @Mutation(() => Category)
  async deleteCategory(
    @Arg('data')
    { id }: DeleteCategoryInput
  ): Promise<Category | null> {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return null;
    } else {
      await category.softRemove();
    }

    return category;
  }

  /* ------------------------------------
  => Restore category based on Id
  ------------------------------------ */
  @Mutation(() => Category)
  async restoreCategory(
    @Arg('data')
    { id }: DeleteCategoryInput
  ): Promise<Category | null> {
    const category = await Category.findOne({ withDeleted: true, where: { id } });
    if (!category) {
      return null;
    } else {
      await category.recover();
    }

    return category;
  }

  /* ------------------------------------
  => Delete category based on Id permanently
  ------------------------------------ */
  @Mutation(() => Category)
  async deletePermanentCategory(
    @Arg('data')
    { id }: DeleteCategoryInput
  ): Promise<Category | null> {
    const category = await Category.findOne({ withDeleted: true, where: { id } });
    if (!category) {
      return null;
    } else {
      return await category.remove();
    }
  }
}
