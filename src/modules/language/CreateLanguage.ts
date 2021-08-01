import { Resolver, Mutation, Arg } from 'type-graphql';
import { Language } from '../../entity/Language';
import { AddLanguageInput } from './input/AddLanguageInput';
import { getCurrentDateTimeString } from '../../utils'

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
    const currentDateTime: string = getCurrentDateTimeString();
    const language = await Language.create({
      name,
      shortName,
      createDate: currentDateTime,
    }).save();

    return language;
  }
}
