import { ObjectType, Field } from 'type-graphql';

type Result = string;

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

@ObjectType('GetMentionNotificationResponse')
export class GetMentionNotificationResponse {
  @Field({
    nullable: true
  })
  result: Result;
}