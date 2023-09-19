import { Field, InputType } from 'type-graphql';
import { EditCategoryContentInput } from '../../categoryContent/input/EditCategoryContentInput';

@InputType()
export class EditCategoryInput {
  @Field()
  id: number;

  @Field(() => [EditCategoryContentInput])
  contents: EditCategoryContentInput[];
}
