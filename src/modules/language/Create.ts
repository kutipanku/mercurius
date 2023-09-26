import { Resolver, Mutation, Arg } from 'type-graphql';
import { Language } from '@/entity';
import { CreateLanguageInput } from '@/modules/language/input';

@Resolver(Language)
export class CreateLanguageResolver {
  /* ------------------------------------
  => Add new language
  ------------------------------------ */
  @Mutation(() => Language)
  async createLanguage(
    @Arg('data')
    { name, shortName }: CreateLanguageInput
  ): Promise<Language> {
    const language = await Language.create({
      name,
      shortName
    }).save();

    return language;
  }
}
