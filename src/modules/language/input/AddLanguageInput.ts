import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddLanguageInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @Length(1, 255)
  shortName: string;
}
