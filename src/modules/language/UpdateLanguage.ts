import { Resolver, Mutation, Arg } from 'type-graphql';
import { Language } from '../../entity/Language';
import { EditLanguageInput } from './input/EditLanguageInput';
import { getCurrentDateTimeString } from '../../utils'

@Resolver(Language)
export class UpdateLanguageResolver {
  /* ------------------------------------
  => Edit language based on Id
  ------------------------------------ */
  @Mutation(() => Language)
  async updateLanguage(
    @Arg('data')
    { id, name }: EditLanguageInput
  ): Promise<Language | null> {
    const currentDateTime: string = getCurrentDateTimeString();
    const language = await Language.findOne({ where: { id } });
    if (!language) {
      return null;
    } else {
      language.name = name;
      language.updateDate = currentDateTime
      await language.save();
    }

    return language;
  }
}
