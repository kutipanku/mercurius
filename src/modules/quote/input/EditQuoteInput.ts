import { Field, InputType, ObjectType } from 'type-graphql';
import { EditContentInput } from '../../content/input/EditContentInput';

@ObjectType()
@InputType()
export class EditQuoteInput {
  @Field()
  id: number;

  @Field()
  status: string;

  @Field()
  authorId: number;

  @Field(() => [EditContentInput])
  contents: EditContentInput[];
}
