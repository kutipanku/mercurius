import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('AddAuthorContentInput')
@InputType()
export class AddAuthorContentInput {
  @Field()
  text: string;

  @Field()
  languageId: number;

  @Field({
    nullable: true
  })
  createDate: string;
}
