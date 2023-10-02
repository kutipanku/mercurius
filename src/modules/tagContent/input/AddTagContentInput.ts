import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('AddTagContentInput')
@InputType()
export class AddTagContentInput {
  @Field()
  text: string;

  @Field()
  languageId: number;

  @Field({
    nullable: true
  })
  createDate: string;
}
