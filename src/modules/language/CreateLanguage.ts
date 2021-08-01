import { Resolver, Mutation, Arg } from 'type-graphql';
import { Language } from '../../entity/Language';
import { AddLanguageInput } from './input/AddLanguageInput';

@Resolver(Language)
export class CreateLanguageResolver {
  /* ------------------------------------
  => Add new language
  ------------------------------------ */
  @Mutation(() => Language)
  async createLanguage(
    @Arg('data')
    { name, shortName }: AddLanguageInput
  ): Promise<Language> {
    const language = await Language.create({
      name,
      shortName
    }).save();

    return language;
  }
}
