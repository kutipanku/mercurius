import { Resolver, Mutation, Arg } from 'type-graphql';
import { Category } from '../../entity/Category';
import { AddCategoryInput } from './input/AddCategoryInput';

@Resolver(Category)
export class CreateCategoryResolver {
  /* ------------------------------------
  => Add new category
  ------------------------------------ */
  @Mutation(() => Category)
  async createCategory(
    @Arg('data')
    { name }: AddCategoryInput
  ): Promise<Category> {
    const category = await Category.create({
      name
    }).save();

    return category;
  }
}
