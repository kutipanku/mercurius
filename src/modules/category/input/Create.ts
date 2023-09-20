import { Field, InputType } from 'type-graphql';
import { AddCategoryContentInput } from '@/modules/categoryContent/input';

@InputType()
export class AddCategoryInput {
  @Field(() => [AddCategoryContentInput])
  contents: AddCategoryContentInput[];
}
