import { Field, InputType } from 'type-graphql';
import { UpdateCategoryContentInput } from '@/modules/categoryContent/input';

@InputType()
export class UpdateCategoryInput {
  @Field()
  id: number;

  @Field(() => [UpdateCategoryContentInput])
  contents: UpdateCategoryContentInput[];
}
