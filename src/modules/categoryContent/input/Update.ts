import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('UpdateCategoryContentInput')
@InputType()
export class UpdateCategoryContentInput {
  @Field()
  id: number;

  @Field()
  text: string;

  @Field()
  languageId: number;
}
