import { Resolver, Query } from 'type-graphql';

@Resolver()
export class SayPongResolver {
  /* ------------------------------------
  => Used for service healt check
  ------------------------------------ */
  @Query()
  ping(): string {
    return 'pong';
  }
}
