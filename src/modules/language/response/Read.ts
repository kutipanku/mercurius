import { ObjectType, Field } from 'type-graphql';
import { Author } from '@/entity';

@ObjectType()
export class ReadLanguageResponse {
  @Field()
  page!: number;

  @Field()
  showing!: number;

  @Field()
  total!: number;

  @Field(() => [Author])
  data!: Author[];
}