import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddQuoteInput {
  @Field()
  @Length(1, 255)
  content: string;

  @Field()
  authorId: number;

  @Field()
  languageId: number;
}
