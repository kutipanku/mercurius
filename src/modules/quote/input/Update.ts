import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('UpdateQuoteInput')
@InputType()
export class UpdateQuoteInput {
  @Field()
  id: number;

  @Field()
  status: string;

  @Field()
  authorId: number;

  @Field(() => [Number], { nullable: true })
  tags: number[];

  @Field({
    nullable: true
  })
  contentID: string;

  @Field({
    nullable: true
  })
  contentEN: string;
}
