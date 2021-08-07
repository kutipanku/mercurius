import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddCategoryInput {
  @Field()
  @Length(1, 255)
  name: string;
}
