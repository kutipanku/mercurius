import { Resolver, Mutation, Arg } from 'type-graphql';
import { Category } from '@/entity';
import { AddCategoryInput } from '@/modules/category/input';

@Resolver(Category)
export class CreateCategoryResolver {
  /* ------------------------------------
  => Add new category
  ------------------------------------ */
  @Mutation(() => Category)
  async createCategory(
    @Arg('data')
    { contentID, contentEN }: AddCategoryInput
  ): Promise<Category> {
    const category = await Category.create({
      contentID, contentEN
    }).save();

    return category;
  }
}
