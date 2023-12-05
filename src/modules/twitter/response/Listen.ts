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

@ObjectType('TweetProfile')
export class TweetProfile {
  @Field({
    nullable: true
  })
  name: string;

  @Field({
    nullable: true
  })
  image: string;

  @Field({
    nullable: true
  })
  id: string;

  @Field({
    nullable: true
  })
  description: string;
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

  @Field({
    nullable: true
  })
  profile: TweetProfile;
}