import { Field, InputType, ObjectType } from 'type-graphql';
import { AddQuoteContentInput } from '../../quoteContent/input/AddQuoteContentInput';

@ObjectType()
@InputType()
export class AddQuoteInput {
  @Field()
  authorId: number;

  @Field()
  categoryId: number;

  @Field()
  status: string;

  @Field(() => [AddQuoteContentInput])
  contents: AddQuoteContentInput[];

  @Field(() => [Number])
  tags: number[];
}
