import { Field, InputType } from 'type-graphql';

@InputType()
export class DeleteTagInput {
  @Field()
  id: number;
}
