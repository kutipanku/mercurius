import { Field, InputType } from 'type-graphql';
import { AddTagContentInput } from '../../tagContent/input/AddTagContentInput';

@InputType()
export class AddTagInput {
  @Field(() => [AddTagContentInput])
  contents: AddTagContentInput[];
}
