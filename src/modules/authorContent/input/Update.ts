import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('UpdateAuthorContentInput')
@InputType()
export class UpdateAuthorContentInput {
  @Field()
  id: number;

  @Field()
  text: string;

  @Field()
  languageId: number;
}
