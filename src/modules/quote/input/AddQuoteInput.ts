import { Field, InputType, ObjectType } from 'type-graphql';
import { AddContentInput } from './AddContentInput';

@ObjectType()
@InputType()
export class AddQuoteInput {
  @Field()
  authorId: number;

  @Field()
  status: string;

  @Field(() => [AddContentInput])
  contents: AddContentInput[];
}
