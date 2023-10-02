import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('EditTagContentInput')
@InputType()
export class EditTagContentInput {
  @Field()
  id: number;

  @Field()
  text: string;

  @Field()
  languageId: number;
}
