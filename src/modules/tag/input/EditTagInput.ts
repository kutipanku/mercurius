import { Field, InputType } from 'type-graphql';
import { EditTagContentInput } from '../../tagContent/input/EditTagContentInput';

@InputType()
export class EditTagInput {
  @Field()
  id: number;

  @Field(() => [EditTagContentInput])
  contents: EditTagContentInput[];
}
