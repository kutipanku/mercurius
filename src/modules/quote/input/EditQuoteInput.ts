import { Field, InputType, ObjectType } from 'type-graphql';
import { EditQuoteContentInput } from '../../quoteContent/input/EditQuoteContentInput';
import { EditTagInput } from '../../tag/input/EditTagInput';

@ObjectType('EditQuoteInput')
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

  @Field(() => [EditQuoteContentInput])
  contents: EditQuoteContentInput[];
}
