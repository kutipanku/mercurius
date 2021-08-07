import { Resolver, Query, Arg } from 'type-graphql';
import { Category } from '../../entity/Category';

@Resolver(Category)
export class ReadCategoryResolver {
  /* ------------------------------------
  => Get category by id
  ------------------------------------ */
  @Query(() => Category, { nullable: true })
  async category(@Arg('id') id: string): Promise<Category | null> {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return null;
    }
    return category;
  }

  /* ------------------------------------
  => Get all categories
  ------------------------------------ */
  @Query(() => [Category])
  async allCategory(
    @Arg('page', { nullable: true }) page: number,
    @Arg('rowPerPage', { nullable: true }) rowPerPage: number
  ): Promise<Category[] | null> {
    let categories = [];
    if (rowPerPage === 0) {
      categories = await Category.find({
        relations: ['quote']
      });
    } else {
      categories = await Category.find({
        skip: (page - 1) * rowPerPage,
        take: rowPerPage,
        relations: ['quote']
      });
    }
    if (!categories) {
      return null;
    }
    return categories;
  }
}
