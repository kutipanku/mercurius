import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('AddQuoteContentInput')
@InputType()
export class AddQuoteContentInput {
  @Field()
  text: string;

  @Field()
  languageId: number;
}
