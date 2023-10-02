import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('DeleteQuoteInput')
@InputType()
export class DeleteQuoteInput {
  @Field()
  id: number;
}
