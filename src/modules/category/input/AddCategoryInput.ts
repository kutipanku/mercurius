import { Field, InputType } from 'type-graphql';
import { AddCategoryContentInput } from '../../categoryContent/input/AddCategoryContentInput';

@InputType()
export class AddCategoryInput {
  @Field(() => [AddCategoryContentInput])
  contents: AddCategoryContentInput[];
}
