import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class DeleteQuoteInput {
  @Field()
  id: number;
}
