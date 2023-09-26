import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateLanguageInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @Length(1, 255)
  shortName: string;
}
