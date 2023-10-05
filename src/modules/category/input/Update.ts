import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateCategoryInput {
  @Field()
  id: number;

  @Field({
    nullable: true
  })
  @Length(1, 255)
  contentID: string;

  @Field({
    nullable: true
  })
  @Length(1, 255)
  contentEN: string;
}
