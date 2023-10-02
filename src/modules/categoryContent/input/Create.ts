import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('AddCategoryContentInput')
@InputType()
export class AddCategoryContentInput {
  @Field()
  text: string;

  @Field()
  languageId: number;

  @Field({
    nullable: true
  })
  createDate: string;
}
