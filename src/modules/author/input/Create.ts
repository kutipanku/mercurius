import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { AddAuthorContentInput } from '../../authorContent/input/AddAuthorContentInput';

@InputType()
export class CreateAuthorInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field({
    nullable: true
  })
  @Length(1, 255)
  pictureUrl: string;

  @Field(() => [AddAuthorContentInput], { nullable: true })
  contents: AddAuthorContentInput[];
}
