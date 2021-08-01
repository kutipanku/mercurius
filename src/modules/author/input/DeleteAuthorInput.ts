import { Field, InputType } from 'type-graphql';

@InputType()
export class DeleteAuthorInput {
  @Field()
  id: number;
}
