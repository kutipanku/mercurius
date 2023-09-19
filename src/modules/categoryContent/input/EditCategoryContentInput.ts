import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class EditCategoryContentInput {
  @Field()
  id: number;

  @Field()
  text: string;

  @Field()
  languageId: number;
}
