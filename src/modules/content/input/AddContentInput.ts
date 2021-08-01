import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class AddContentInput {
  @Field()
  text: string;

  @Field()
  languageId: number;
}
