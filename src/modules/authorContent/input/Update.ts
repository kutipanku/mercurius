import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class UpdateAuthorContentInput {
  @Field()
  id: number;

  @Field()
  text: string;

  @Field()
  languageId: number;
}
