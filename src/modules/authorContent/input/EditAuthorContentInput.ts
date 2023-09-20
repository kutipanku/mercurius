import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class EditAuthorContentInput {
  @Field()
  id: number;

  @Field()
  text: string;

  @Field()
  languageId: number;
}
