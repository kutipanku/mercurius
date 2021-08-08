import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddTagInput {
  @Field()
  @Length(1, 255)
  name: string;
}
