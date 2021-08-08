import { Field, InputType, ObjectType } from 'type-graphql';
import { EditContentInput } from '../../content/input/EditContentInput';
import { EditTagInput } from '../../tag/input/EditTagInput';

@ObjectType()
@InputType()
export class EditQuoteInput {
  @Field()
  id: number;

  @Field()
  status: string;

  @Field()
  authorId: number;

  @Field(() => [EditTagInput])
  tags: EditTagInput[];

  @Field(() => [EditContentInput])
  contents: EditContentInput[];
}
