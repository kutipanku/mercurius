import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class AddQuoteContentInput {
  @Field()
  text: string;

  @Field()
  languageId: number;

  @Field({
    nullable: true
  })
  createDate: string;
}
