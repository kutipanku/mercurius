import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { EditAuthorContentInput } from '../../authorContent/input/EditAuthorContentInput';

@InputType()
export class EditAuthorInput {
  @Field()
  id: number;

  @Field()
  @Length(1, 255)
  name: string;

  @Field({
    nullable: true
  })
  @Length(1, 255)
  pictureUrl: string;

  @Field(() => [EditAuthorContentInput], { nullable: true })
  contents: EditAuthorContentInput[];
}
