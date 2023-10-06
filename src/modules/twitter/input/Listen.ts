import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ListenTwitterInput {
  @Field({
    nullable: true
  })
  @Length(1, 255)
  action: string;

  @Field({
    nullable: true
  })
  @Length(1, 255)
  cronInterval: string;
}
