import { Resolver, Mutation, Arg } from 'type-graphql';
import { Language } from '../../entity/Language';
import { EditLanguageInput } from './input/EditLanguageInput';

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
    const language = await Language.findOne({ where: { id } });
    if (!language) {
      return null;
    } else {
      language.name = name;
      await language.save();
    }

    return language;
  }
}
