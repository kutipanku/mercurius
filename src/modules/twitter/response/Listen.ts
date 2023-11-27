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
  cronInterval: number;

  @Field({
    nullable: true
  })
  status: string;

  @Field(() => [String], {
    nullable: true
  })
  logs: string[];
}

@ObjectType('GetMentionNotificationResponse')
export class GetMentionNotificationResponse {
  @Field({
    nullable: true
  })
  result: Result;
}

@ObjectType('TweetDetailResponse')
export class TweetDetailResponse {
  @Field({
    nullable: true
  })
  content: string;

  @Field(() => [String], {
    nullable: true
  })
  media: string[];
}