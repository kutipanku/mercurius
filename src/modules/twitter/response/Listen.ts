import { ObjectType, Field } from 'type-graphql';

@ObjectType('TwitterListenResponse')
export class TwitterListenResponse {
  @Field({
    nullable: true
  })
  message: string;

  @Field({
    nullable: true
  })
  cronInterval: string;

  @Field({
    nullable: true
  })
  status: string;
}