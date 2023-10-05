import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('CreateQuoteInput')
@InputType()
export class CreateQuoteInput {
  @Field()
  authorId: number;

  @Field()
  categoryId: number;

  @Field()
  status: string;

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
